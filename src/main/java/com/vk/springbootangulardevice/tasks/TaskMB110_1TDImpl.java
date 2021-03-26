package com.vk.springbootangulardevice.tasks;

import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.service", "com.vk.springbootangulardevice.database.convertor", "com.vk.springbootangulardevice.modbus.device"})
public class TaskMB110_1TDImpl extends TaskRootImpl<DeviceModelMB110_1TD, TableModelMB110_1TD, JsonBodyListForTableModelMB110_1TD, ServiceMB110_1TD, DeviceToTableMB110_1TD> implements TaskMB110_1TD {

    private final ServiceMB110_1TD service;

    private final DeviceModelMB110_1TD deviceModel;

    private final DeviceToTableMB110_1TD deviceToTable;

    @Autowired
    public TaskMB110_1TDImpl(final ServiceMB110_1TD service,
                             final DeviceModelMB110_1TD deviceModel,
                             final DeviceToTableMB110_1TD deviceToTable) {
        super(service, deviceModel, deviceToTable);
        this.service = service;
        this.deviceModel = deviceModel;
        this.deviceToTable = deviceToTable;
    }
}
