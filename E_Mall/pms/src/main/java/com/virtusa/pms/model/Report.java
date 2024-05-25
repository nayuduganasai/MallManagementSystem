//package com.virtusa.pms.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDate;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Report {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long reportId;
//    private LocalDate dateGenerated;
//
//    @ManyToOne
//    @JoinColumn(name = "marketingStaffUserId")
//    private MarketingStaff marketingStaff;
//
//    @ManyToOne
//    @JoinColumn(name = "ownerUserId")
//    private SpaceOwner owner;
//
//    // Additional attributes and relationships
//}
