package com.virtusa.pms.service;

import com.virtusa.pms.dto.FeedbackDTO;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.Feedback;
import com.virtusa.pms.model.Space;
import com.virtusa.pms.model.User;
import com.virtusa.pms.repository.FeedbackRepo;
import com.virtusa.pms.repository.SpaceRepository;
import com.virtusa.pms.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

//@SpringBootTest
public class FeedbackServiceTest {

    @Mock
    private FeedbackRepo feedbackRepository;

    @Mock
    private SpaceRepository spaceRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private FeedbackService feedbackService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        feedbackService = new FeedbackService(feedbackRepository, spaceRepository ,userRepository,modelMapper);
    }

    @Test
    public void testCreateFeedback_Success() throws CustomException {
        FeedbackDTO feedbackDTO = new FeedbackDTO(1L, 5, "Great!", 1, 1);
        Feedback feedback = new Feedback(1L, 5, "Great!", new User(), new Space());

        when(userRepository.findById(any())).thenReturn(Optional.of(new User()));
        when(spaceRepository.findById(any())).thenReturn(Optional.of(new Space()));
        when(feedbackRepository.save(any())).thenReturn(feedback);
        when(modelMapper.map(any(), any())).thenReturn(feedbackDTO);

        FeedbackDTO createdFeedback = feedbackService.createFeedback(feedbackDTO);

        assertNotNull(createdFeedback);
        assertEquals(feedbackDTO.getComment(), createdFeedback.getComment());
        verify(feedbackRepository, times(1)).save(any());
    }

    @Test
    public void testCreateFeedback_Failure() {
        FeedbackDTO feedbackDTO = new FeedbackDTO(1L, 5, "Great!", 1, 1);

        when(userRepository.findById(any())).thenReturn(Optional.empty());
        when(spaceRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            feedbackService.createFeedback(feedbackDTO);
        });
        verify(feedbackRepository, never()).save(any());
    }

    @Test
    public void testGetAllFeedbacks_Success() throws CustomException {
        List<Feedback> feedbackList = new ArrayList<>();
        feedbackList.add(new Feedback(1L, 5, "Great!", new User(), new Space()));

        when(feedbackRepository.findAll()).thenReturn(feedbackList);

        List<FeedbackDTO> allFeedbacks = feedbackService.getAllFeedbacks();

        assertFalse(allFeedbacks.isEmpty());
        assertEquals(feedbackList.size(), allFeedbacks.size());
        verify(feedbackRepository, times(1)).findAll();
    }

    // Similarly, add tests for getFeedbackById, updateFeedback, and deleteFeedback covering success and failure scenarios

    @Test
    public void testGetFeedbackById_Failure() {
        Long id = 1L;

        when(feedbackRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CustomException.class, () -> {
            feedbackService.getFeedbackById(id);
        });
        verify(feedbackRepository, times(1)).findById(id);
    }

    @Test
    public void testUpdateFeedback_Success() throws CustomException {
        Long id = 1L;
        FeedbackDTO updatedFeedback = new FeedbackDTO(1L, 5, "Updated", 1, 1);
        Feedback feedbackRes = new Feedback(1L, 5, "Updated", new User(), new Space());
        Feedback feedback = new Feedback(1L, 5, "good", new User(), new Space());
        // Mock the behavior of findById to return an Optional with a value
        when(feedbackRepository.findById(id)).thenReturn(Optional.of(feedback));
        when(userRepository.findById(updatedFeedback.getUserId())).thenReturn(Optional.of(new User()));
        when(spaceRepository.findById(updatedFeedback.getSpaceId())).thenReturn(Optional.of(new Space()));

        // Mock the behavior of save method to return the expected result
        when(feedbackRepository.save(any())).thenReturn(feedbackRes);

        FeedbackDTO result = feedbackService.updateFeedback(id, updatedFeedback);

        assertNotNull(result);
        assertEquals(updatedFeedback.getComment(), result.getComment());
        verify(feedbackRepository, times(1)).findById(id);
        verify(feedbackRepository, times(1)).save(any());
    }


    @Test
    public void testUpdateFeedback_Failure() {
        Long id = 1L;
        FeedbackDTO updatedFeedback = new FeedbackDTO(1L, 5, "Updated", 1, 1);

        when(feedbackRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CustomException.class, () -> {
            feedbackService.updateFeedback(id, updatedFeedback);
        });
        verify(feedbackRepository, times(1)).findById(id);
        verify(feedbackRepository, never()).save(any());
    }

    @Test
    public void testDeleteFeedback_Success() throws CustomException {
        Long id = 1L;

        when(feedbackRepository.existsById(id)).thenReturn(true);

        assertDoesNotThrow(() -> {
            feedbackService.deleteFeedback(id);
        });
        verify(feedbackRepository, times(1)).existsById(id);
        verify(feedbackRepository, times(1)).deleteById(id);
    }

    @Test
    public void testDeleteFeedback_Failure() {
        Long id = 1L;

        when(feedbackRepository.existsById(id)).thenReturn(false);

        assertThrows(CustomException.class, () -> {
            feedbackService.deleteFeedback(id);
        });
        verify(feedbackRepository, times(1)).existsById(id);
        verify(feedbackRepository, never()).deleteById(id);
    }
}
