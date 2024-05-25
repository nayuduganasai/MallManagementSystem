package com.virtusa.pms.service.interfaces;
import com.virtusa.pms.dto.ComplaintDTO;
import java.util.List;
public interface ComplaintService {
    List<ComplaintDTO> getAllComplaints();
    ComplaintDTO getComplaintById(int complaintId);
    ComplaintDTO createComplaint(ComplaintDTO complaintDTO);
    ComplaintDTO updateComplaint(int complaintId, ComplaintDTO complaintDTO);
    void deleteComplaint(int complaintId);
    
}
