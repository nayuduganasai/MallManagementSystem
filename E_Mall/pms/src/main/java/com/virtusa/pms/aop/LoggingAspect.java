package com.virtusa.pms.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("execution(* com.virtusa.pms.service.*.*(..))")
    public Object logMethodExecutionTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        logger.info(String.format("Entering method: %s",proceedingJoinPoint.getSignature().getName()));


        Object result;
        try {
            result = proceedingJoinPoint.proceed();
            logger.info("Success in method: " + proceedingJoinPoint.getSignature().getName());
            return result;
        } catch (Exception ex) {
            logger.error("Exception in method: " + proceedingJoinPoint.getSignature().getName()+" ---> message : "+ex.getMessage());
            throw ex;
        } finally {
            long executionTime = System.currentTimeMillis() - startTime;
            logger.info("Exiting method: " + proceedingJoinPoint.getSignature().getName());
            logger.info("Execution time for " + proceedingJoinPoint.getSignature().getName() + ": " + executionTime + "ms");
        }
    }
}

