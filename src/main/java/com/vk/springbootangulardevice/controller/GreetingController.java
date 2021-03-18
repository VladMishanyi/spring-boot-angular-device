package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.model.Greeting;
import com.vk.springbootangulardevice.model.HelloMessage;
import com.vk.springbootangulardevice.model.JsonBodyLocalDateTimeFromChart;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class GreetingController {
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    @MessageMapping("/date-to-server")
    @SendTo("/topic/date-from-server")
    public JsonBodyLocalDateTimeFromChart tryToParseLocalDateTime(@RequestBody JsonBodyLocalDateTimeFromChart jsonBodyLocalDateTimeFromChart){
        System.out.println("---this is local date time from user :" + jsonBodyLocalDateTimeFromChart.getStart() + "---" + jsonBodyLocalDateTimeFromChart.getEnd());
        return jsonBodyLocalDateTimeFromChart;
    }

//    @MessageMapping("/date-to-server")
//    @SendTo("/topic/date-from-server")
//    public void tryToParseLocalDateTime(@RequestBody Map<String, Object> json){
//        System.out.println("---this is local date time from user :" + json);
//    }
}
