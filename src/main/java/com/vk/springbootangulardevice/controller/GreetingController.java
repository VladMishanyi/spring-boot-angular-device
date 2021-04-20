package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyLocalDateTimeFromChart;
import com.vk.springbootangulardevice.model.Greeting;
import com.vk.springbootangulardevice.model.HelloMessage;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@RestController
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.service"})
public class GreetingController {
    public final ServiceMB110_1TD serviceMB110_1TD;

    @Autowired
    public GreetingController(final ServiceMB110_1TD serviceMB110_1TD) {
        this.serviceMB110_1TD = serviceMB110_1TD;
    }

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    @MessageMapping("/date-to-server")
    @SendTo("/topic/date-from-server")
    public JsonBodyLocalDateTimeFromChart tryToParseLocalDateTime(JsonBodyLocalDateTimeFromChart jsonBodyLocalDateTimeFromChart) throws Exception{
        System.out.println("---this is local date time from user :" + jsonBodyLocalDateTimeFromChart.toString());
        JsonBodyLocalDateTimeFromChart jbdtf = new JsonBodyLocalDateTimeFromChart();
            jbdtf.setStart(jsonBodyLocalDateTimeFromChart.getStart().minusMinutes(30));
            jbdtf.setEnd(jsonBodyLocalDateTimeFromChart.getEnd().minusMinutes(30));
            Thread.sleep(2000); // simulated delay
         return jbdtf;
    }

    @MessageMapping(value="/generate-chart-laboratory-reometr")
    @SendTo("/topic/generate-chart-laboratory-reometr")
    public List<TableModelMB110_1TD> generateChart(JsonBodyLocalDateTimeFromChart jsonBodyLocalDateTimeFromChart){
        return serviceMB110_1TD.databaseFindByDateBetween(jsonBodyLocalDateTimeFromChart.getStart(), jsonBodyLocalDateTimeFromChart.getEnd());
    }

//    @MessageMapping("/date-to-server")
//    @SendTo("/topic/date-from-server")
//    public User tryToParseLocalDateTime(User user) throws Exception{
//        System.out.println("---this is local date time from user :" + user.getName() + "---" + user.getAge());
//        Thread.sleep(2000); // simulated delay
//        return user;
//    }

//    @MessageMapping("/date-to-server")
//    @SendTo("/topic/date-from-server")
//    public void tryToParseLocalDateTime(@RequestBody Map<String, Object> json){
//        System.out.println("---this is local date time from user :" + json);
//    }
}
