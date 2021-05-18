package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.chain.ChainModbus;
import com.vk.springbootangulardevice.chain.ChainProgram;
import com.vk.springbootangulardevice.chain.ChainRaspberry;
import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import com.vk.springbootangulardevice.json.JsonBodyLocalDateTimeFromChart;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.model.Greeting;
import com.vk.springbootangulardevice.model.HelloMessage;
import com.vk.springbootangulardevice.model.ModelRaspberry;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseRecipe;
import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceRecipe;
import com.vk.springbootangulardevice.tasks.TaskMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.Objects;

@RestController
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.service"})
public class GreetingController {
    private final ServiceMB110_1TD serviceMB110_1TD;
    private ChainModbus chainModbus;
    private ChainProgram chainProgram;
    private ChainRaspberry chainRaspberry;
    private final TaskMB110_1TD taskMB110_1TD;
    private final RepositoryRaspberry repositoryRaspberry;
    private final DeviceModelMB110_1TD deviceModelMB110_1TD;
    private final ModelRaspberry modelRaspberry;
    private final DeviceToTableMB110_1TD deviceToTableMB110_1TD;
    private final ServiceRecipe serviceRecipe;

    @Autowired
    public GreetingController(final ServiceMB110_1TD serviceMB110_1TD,
                              final ChainModbus chainModbus,
                              final ChainProgram chainProgram,
                              final ChainRaspberry chainRaspberry,
                              final TaskMB110_1TD taskMB110_1TD,
                              final RepositoryRaspberry repositoryRaspberry,
                              final DeviceModelMB110_1TD deviceModelMB110_1TD,
                              final ModelRaspberry modelRaspberry,
                              final DeviceToTableMB110_1TD deviceToTableMB110_1TD,
                              final ServiceRecipe serviceRecipe) {
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.chainModbus = chainModbus;
        this.chainProgram = chainProgram;
        this.chainRaspberry = chainRaspberry;
        this.taskMB110_1TD = taskMB110_1TD;
        this.repositoryRaspberry = repositoryRaspberry;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.modelRaspberry = modelRaspberry;
        this.deviceToTableMB110_1TD = deviceToTableMB110_1TD;
        this.serviceRecipe = serviceRecipe;
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

    @MessageMapping(value="/table-recipe")
    public void saveNewRecipe(TableModelRecipe recipe){
        if (Objects.nonNull(recipe)) {
            if (Objects.nonNull(recipe.getName())){
                serviceRecipe.databaseAddTableDevice(new TableModelRecipe(recipe.getName(),recipe.getTime()));
            }
        }
    }

    @Scheduled(fixedRate = 1000*60)
    private void loopModbus(){
        if (!chainModbus.isAlive()){
            chainModbus = new ChainModbus(taskMB110_1TD, serviceMB110_1TD);
        }
    }

    @Scheduled(fixedRate = 1000*60)
    private void loopProgram(){
        if (!chainProgram.isAlive()){
            chainProgram = new ChainProgram(serviceMB110_1TD, deviceModelMB110_1TD, modelRaspberry, deviceToTableMB110_1TD, serviceRecipe);
        }
    }

    @Scheduled(fixedRate = 1000*60)
    private void loopRaspberry(){
        if (!chainRaspberry.isAlive()){
            chainRaspberry = new ChainRaspberry(repositoryRaspberry);
        }
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
