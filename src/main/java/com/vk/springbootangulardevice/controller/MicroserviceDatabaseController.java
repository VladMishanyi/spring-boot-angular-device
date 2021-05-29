package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.entity.ModbusBodyDateRange;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@ComponentScan(basePackages = {})
@RequestMapping(value = "/database/mv110-1dt")
public class MicroserviceDatabaseController {

    private final ServiceMB110_1TD service;

    @Autowired
    public MicroserviceDatabaseController(final ServiceMB110_1TD service) {
        this.service = service;
    }

    @RequestMapping(value = "/range", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public JsonBodyListForTableModelMB110_1TD rangeOfData(@RequestBody ModbusBodyDateRange modbusBodyDateRange){
        List<TableModelMB110_1TD> tableModelList = service.databaseFindByDateBetween(modbusBodyDateRange.getFrom(), modbusBodyDateRange.getTo());
        JsonBodyListForTableModelMB110_1TD jsonBodyListForTableModel = new JsonBodyListForTableModelMB110_1TD();
        jsonBodyListForTableModel.setTableModelList(tableModelList);
        return jsonBodyListForTableModel;
    }

    @RequestMapping(value = "/get-last-row", method = RequestMethod.GET)
    public TableModelMB110_1TD getLastRowFromTableModel(){
        return service.databaseFindLastValueByDate();
    }

    @RequestMapping(value = "/get-current-date-time", method = RequestMethod.GET)
    public LocalDateTime getLocalDateTime(){
        return LocalDateTime.now();
    }
}
