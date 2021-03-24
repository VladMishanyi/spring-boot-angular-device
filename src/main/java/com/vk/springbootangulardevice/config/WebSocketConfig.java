package com.vk.springbootangulardevice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
@Configuration
@EnableScheduling
@EnableWebSocketMessageBroker
@ComponentScan(basePackages = "com.vk.springbootangulardevice")
@PropertySource("classpath:websoket.properties")
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${websoket.simpleBroker}")
    private String simpleBroker;

    @Value("${websoket.destinationPrefixes}")
    private String destinationPrefixes;

    @Value("${websoket.endpoint}")
    private String endpoint;

    @Value("${websoket.origins}")
    private String origins;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker(simpleBroker);
        config.setApplicationDestinationPrefixes(destinationPrefixes);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(endpoint).setAllowedOrigins(origins).withSockJS();
    }
}

