package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyLocalDateTimeFromChart;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceRecipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@ComponentScan(basePackages = {"com.vk.springbootangulardevice"})
public class ChartController {
    private final ServiceMB110_1TD serviceMB110_1TD;
    private final ServiceRecipe serviceRecipe;

    @Autowired
    public ChartController(final ServiceMB110_1TD serviceMB110_1TD,
                              final ServiceRecipe serviceRecipe) {
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.serviceRecipe = serviceRecipe;
    }

    @MessageMapping(value="/generate-chart-laboratory-reometr")
    @SendTo("/topic/generate-chart-laboratory-reometr")
    public List<TableModelMB110_1TD> generateChart(JsonBodyLocalDateTimeFromChart jsonBodyLocalDateTimeFromChart){
        return serviceMB110_1TD.databaseFindByDateBetween(jsonBodyLocalDateTimeFromChart.getStart(), jsonBodyLocalDateTimeFromChart.getEnd());
    }
}
