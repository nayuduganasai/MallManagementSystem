package com.virtusa.pms.exception;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorInfo {

    LocalDateTime timestamp;
    String msg;
    String url;

}
