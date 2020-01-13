package com.easyclinic.user.cognito;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "cognito")
public class CognitoProperties {

    String clientId;
    String userPoolId;
    String endpoint;
    String region;
    String identityPoolId;
}
