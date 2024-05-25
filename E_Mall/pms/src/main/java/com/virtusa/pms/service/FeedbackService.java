package com.virtusa.pms.service;

import com.virtusa.pms.dto.ComplaintDTO;
import com.virtusa.pms.dto.FeedbackDTO;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.Complaint;
import com.virtusa.pms.model.Feedback;
import com.virtusa.pms.repository.FeedbackRepo;
import com.virtusa.pms.repository.SpaceRepository;
import com.virtusa.pms.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepo feedbackRepository;

    private final SpaceRepository spaceRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public FeedbackService(FeedbackRepo feedbackRepository, SpaceRepository spaceRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.feedbackRepository = feedbackRepository;
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }




    private FeedbackDTO convertToDTO(Feedback feedBack) {
        FeedbackDTO dto = new FeedbackDTO(feedBack.getFeedbackId(),
                feedBack.getRating(),
                feedBack.getComment(),
                feedBack.getUser().getUserId(),
                feedBack.getSpace().getSpaceId());
        return dto;
    }

    private Feedback convertToEntity(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setUser(userRepository.findById(feedbackDTO.getUserId()).get());
        feedback.setSpace(spaceRepository.findById(feedbackDTO.getSpaceId()).get());
        feedback.setComment(feedbackDTO.getComment());
        feedback.setRating(feedbackDTO.getRating());
        return feedback;
    }

    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) throws CustomException {

            Feedback feedback = convertToEntity(feedbackDTO);
            Feedback savedFeedback = feedbackRepository.save(feedback);
            return convertToDTO(savedFeedback);

    }

    public List<FeedbackDTO> getAllFeedbacks() throws CustomException {
        List<Feedback> feedbackList = feedbackRepository.findAll();
        if (feedbackList.isEmpty()) {
            throw new CustomException("No Feedbacks Found");
        } else {
            return feedbackList.stream()
                    .map(feedback -> convertToDTO(feedback))
                    .collect(Collectors.toList());
        }
    }

    public FeedbackDTO getFeedbackById(Long id) throws CustomException {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(id);
        if (optionalFeedback.isPresent()) {
            return convertToDTO(optionalFeedback.get());
        } else {
            throw new CustomException("Feedback with ID " + id + " not found");
        }
    }

    public FeedbackDTO updateFeedback(Long id, FeedbackDTO updatedFeedback) throws CustomException {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(id);
        if (optionalFeedback.isPresent()) {
            Feedback feedback = convertToEntity(updatedFeedback);
            feedback.setFeedbackId(optionalFeedback.get().getFeedbackId());
            Feedback savedFeedback = feedbackRepository.save(feedback);
            return convertToDTO(savedFeedback);
        } else {
            throw new CustomException("Feedback with ID " + id + " not found");
        }
    }

    public void deleteFeedback(Long id) throws CustomException {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
        } else {
            throw new CustomException("Feedback with ID " + id + " not found");
        }
    }
}
