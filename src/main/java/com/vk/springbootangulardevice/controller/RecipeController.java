package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import com.vk.springbootangulardevice.model.*;
import com.vk.springbootangulardevice.service.ServiceRecipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@ComponentScan(basePackages = {"com.vk.springbootangulardevice"})
public class RecipeController {
    private final ServiceRecipe serviceRecipe;

    @Autowired
    public RecipeController(final ServiceRecipe serviceRecipe) {
        this.serviceRecipe = serviceRecipe;
    }

//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }
//
//    @MessageMapping("/date-to-server")
//    @SendTo("/topic/date-from-server")
//    public JsonBodyLocalDateTimeFromChart tryToParseLocalDateTime(JsonBodyLocalDateTimeFromChart jsonBodyLocalDateTimeFromChart) throws Exception{
//        System.out.println("---this is local date time from user :" + jsonBodyLocalDateTimeFromChart.toString());
//        JsonBodyLocalDateTimeFromChart jbdtf = new JsonBodyLocalDateTimeFromChart();
//            jbdtf.setStart(jsonBodyLocalDateTimeFromChart.getStart().minusMinutes(30));
//            jbdtf.setEnd(jsonBodyLocalDateTimeFromChart.getEnd().minusMinutes(30));
//            Thread.sleep(2000); // simulated delay
//         return jbdtf;
//    }

    @MessageMapping(value="/table-recipe")
    @SendTo("/topic/table-recipe")
    public TableModelRecipe saveNewRecipe(TableModelRecipe recipe){
        if (Objects.nonNull(recipe)) {
            if (Objects.nonNull(recipe.getName())){
                serviceRecipe.databaseAddTableDevice(new TableModelRecipe(recipe.getName(),recipe.getTime()));
            }
        }
        return serviceRecipe.databaseFindLastValueByDate();
    }

    @MessageMapping(value="/table-recipe-by-name-pattern")
    @SendTo("/topic/table-recipe-by-name-pattern")
    public List<TableModelRecipe> findRecipeByNamePattern(JsonString pattern){

        if (Objects.nonNull(pattern)) {
            if (pattern.getContent().length() >= 2){
                return serviceRecipe.findAllByName(pattern.getContent());
            }
        }
        return staticInfoRecipe();
    }

    private List<TableModelRecipe> staticInfoRecipe(){
        String checkLength = "please put 2 and more chars";
        List<TableModelRecipe> check = new ArrayList<>(1);
        check.add(new TableModelRecipe(0, LocalDateTime.now(), checkLength, 3));
        return check;
    }

    @MessageMapping(value = "/table-device-by-id")
    @SendTo(value = "/topic/table-device-by-id")
    public List<TableModelMB110_1TD> findByIdRecipe(JsonLong id){
        return serviceRecipe.findByIdRecipe(id.getContent());
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
