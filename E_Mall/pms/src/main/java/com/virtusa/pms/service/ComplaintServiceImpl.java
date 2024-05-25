package com.virtusa.pms.service;

import com.virtusa.pms.repository.SpaceRepository;
import com.virtusa.pms.repository.UserRepository;
import com.virtusa.pms.service.interfaces.ComplaintService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.virtusa.pms.dto.ComplaintDTO;
import com.virtusa.pms.exception.ComplaintNotFoundException;
import com.virtusa.pms.model.Complaint;
import com.virtusa.pms.repository.ComplaintRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private SpaceRepository spaceRepo;
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ComplaintDTO getComplaintById(int complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint not found"));
        return convertToDTO(complaint);
    }

    @Override
    public List<ComplaintDTO> getAllComplaints() {
        List<Complaint> complaints = complaintRepository.findAll();
        return complaints.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ComplaintDTO createComplaint(ComplaintDTO complaintDTO) {
        Complaint complaint = convertToEntity(complaintDTO);

        Complaint savedComplaint = complaintRepository.save(complaint);
        return convertToDTO(savedComplaint);
    }

    @Override
    public ComplaintDTO updateComplaint(int complaintId, ComplaintDTO complaintDTO) {
        Complaint existingComplaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint not found"));

//        modelMapper.map(complaintDTO, existingComplaint);
        Complaint complaint = convertToEntity(complaintDTO);
        complaint.setComplaintId(existingComplaint.getComplaintId());

        Complaint updatedComplaint = complaintRepository.save(complaint);
        return convertToDTO(updatedComplaint);
    }

    @Override
    public void deleteComplaint(int complaintId) {
        complaintRepository.deleteById(complaintId);
    }

    private ComplaintDTO convertToDTO(Complaint complaint) {
        ComplaintDTO dto = new ComplaintDTO(complaint.getComplaintId(),
                                            complaint.getUser().getUserId(),
                                            complaint.getSpace().getSpaceId(),
                                            complaint.getSubject(),
                                            complaint.getDescription(),
                                            complaint.getCreateDate(),
                                            complaint.getStatus());
        return dto;
    }

    private Complaint convertToEntity(ComplaintDTO complaintDTO) {
       Complaint complaintReq = new Complaint();
       complaintReq.setCreateDate(complaintDTO.getCreateDate());
       complaintReq.setDescription(complaintDTO.getDescription());
       complaintReq.setStatus(complaintDTO.getStatus());
       complaintReq.setSubject(complaintDTO.getSubject());
       complaintReq.setSpace(spaceRepo.findById(complaintDTO.getSpaceId()).get());
       complaintReq.setUser(userRepo.findById(complaintDTO.getUserId()).get());
       return complaintReq;
    }
}
