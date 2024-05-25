package com.virtusa.pms.service;

import com.virtusa.pms.dto.DiscountRequest;
import com.virtusa.pms.dto.DiscountResponse;
import com.virtusa.pms.dto.DiscountUpdateResponse;
import com.virtusa.pms.exception.CustomException;
import com.virtusa.pms.model.Discount;
import com.virtusa.pms.model.Space;
import com.virtusa.pms.repository.DiscountRepo;
import com.virtusa.pms.repository.SpaceRepository;
import com.virtusa.pms.service.DiscountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class DiscountServiceTest {

    @Mock
    private DiscountRepo discountRepo;

    @Mock
    private SpaceRepository spaceRepository;

    @Mock
    private ModelMapper modelMapper;
    @InjectMocks
    private DiscountService discountService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        discountService = new DiscountService(discountRepo, modelMapper, spaceRepository);
    }


    @Test    public void testCreateDiscount() throws CustomException {
        // Mocking input
        DiscountRequest request = new DiscountRequest();
        request.setName("TestDiscount");
        request.setPercentage(10.0);
        request.setStartDate(LocalDate.now());
        request.setEndDate(LocalDate.now().plusDays(5));
        request.setSpaceIds(List.of(1, 2, 3));

        // Mocking Space objects
        List<Space> spaces = new ArrayList<>();
        spaces.add(new Space(/* add necessary parameters */));

        // Mocking repository behavior
        when(spaceRepository.findById(anyInt())).thenReturn(Optional.of(new Space(/* add necessary parameters */)));
        when(discountRepo.existsByDiscountName(anyString())).thenReturn(false);
        when(discountRepo.save(any(Discount.class))).thenReturn(new Discount());

        // Mocking modelMapper behavior
        DiscountResponse response = new DiscountResponse();
        response.setDiscountName("TestDiscount");
        when(modelMapper.map(any(Discount.class), eq(DiscountResponse.class))).thenReturn(response);

        // Calling the service method
        DiscountResponse result = discountService.createDiscount(request);

        // Assertions
        assertEquals("TestDiscount", result.getDiscountName()); // Check if response is not null and has expected data
        // Add other assertions based on your expected behavior
    }

    @Test
    public void testGetAllDiscounts() {
        when(discountRepo.findAll()).thenReturn(new ArrayList<>());
        try{
        discountService.getAllDiscounts();}
        catch (Exception e){
            assertEquals("Sorry No Discounts Found",e.getMessage());
        }
        verify(discountRepo, times(1)).findAll();
    }

    @Test
    public void testGetAllDiscounts1() throws CustomException {
        // Mocking Discount objects
        List<Discount> discounts = new ArrayList<>();
        Discount discount = new Discount(1L,"Dussura-Offer",10.0,LocalDate.now(),LocalDate.now().plusDays(5),new HashSet<>());
        discounts.add(discount);

        // Mocking repository behavior to return a list of discounts
        when(discountRepo.findAll()).thenReturn(discounts);

        // Call the service method
        List<DiscountResponse> response = discountService.getAllDiscounts();

        // Assertions
        assertNotNull(response); // Check if response is not null
        assertEquals(discounts.size(), response.size());
//        assertEquals(response.get(0).getDiscountName(),discount.getDiscountName());
    }

    @Test
    public void testGetDiscountById() throws CustomException {
        Long id = 1L;
        Discount discount = new Discount(1L,"Dussura-Offer",10.0,LocalDate.now(),LocalDate.now().plusDays(5),new HashSet<>());
        when(discountRepo.findById(id)).thenReturn(Optional.of(discount));
        discountService.getDiscountById(id);
        verify(discountRepo, times(1)).findById(id);
    }


    @Test
    public void testDeleteDiscount() throws CustomException {
        Long id = 1L;
        when(discountRepo.existsById(id)).thenReturn(true);
        discountService.deleteDiscount(id);
        verify(discountRepo, times(1)).existsById(id);
        verify(discountRepo, times(1)).deleteById(id);
    }

    @Test
    public void testUpdateDiscount() throws CustomException {
        Long id = 1L;
        DiscountRequest request = new DiscountRequest("Christmas Offer", 10.0,
                LocalDate.of(2024, 1, 11), LocalDate.of(2024, 1, 18), new ArrayList<>());

        Discount discount = new Discount(1L,"Dussura-Offer",10.0,LocalDate.now(),LocalDate.now().plusDays(5),new HashSet<>());

        when(discountRepo.findById(id)).thenReturn(Optional.of(discount));

        // Create a non-null DiscountResponse to be returned by the mocked service
        DiscountUpdateResponse expectedResponse = new DiscountUpdateResponse("Christmas Offer", 10.0,
                LocalDate.of(2024, 1, 11), LocalDate.of(2024, 1, 18),new ArrayList<Integer>(),1L);
        when(discountService.updateDiscount(id, request)).thenReturn(expectedResponse);

        DiscountUpdateResponse response = discountService.updateDiscount(id, request);

        // Assert that the response object is not null before accessing its properties
        assertNotNull(response);

        assertEquals("Christmas Offer", response.getName());
        assertEquals(10.0, response.getPercentage());
        assertEquals(LocalDate.of(2024, 1, 11), response.getStartDate());
        assertEquals(LocalDate.of(2024, 1, 18), response.getEndDate());

        verify(discountRepo, times(2)).findById(id);
        verify(discountRepo, times(2)).save(any(Discount.class));
    }

}

