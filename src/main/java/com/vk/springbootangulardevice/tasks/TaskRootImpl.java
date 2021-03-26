package com.vk.springbootangulardevice.tasks;

import com.vk.springbootangulardevice.database.convertor.DeviceToTable;
import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModel;
import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListRoot;
import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceRoot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

//@Component
//@ComponentScan(basePackages = {"com.vk.springbootangulardevice.service", "com.vk.springbootangulardevice.database.convertor", "com.vk.springbootangulardevice.modbus.device"})
public class TaskRootImpl<D extends DeviceModel, T extends TableModel, J extends JsonBodyListRoot<T>, S extends ServiceRoot<T,J,D>, DT extends DeviceToTable<D,D,T>>
        implements TaskRoot<D,T,J,S,DT> {

    private final S service;

    private final D deviceModel;

    private final DT deviceToTable;

    private int counter = 0;

//    @Autowired
    public TaskRootImpl(final S service,
                        final D deviceModel,
                        final DT deviceToTable) {
        this.service = service;
        this.deviceModel = deviceModel;
        this.deviceToTable = deviceToTable;
    }

    @Override
    public S getService() {
        return service;
    }

    @Override
    public D getDeviceModel() {
        return deviceModel;
    }

    @Override
    public DT getDeviceToTable() {
        return deviceToTable;
    }

    @Override
    public void readModbusAndWriteToTable() {
        service.modbusReadDataFromRegisterAll();
        counter++;
        if (deviceModel.hysteresis() && (counter >= 60)){
            T tableModel = deviceToTable.convert(deviceModel);
            service.databaseAddTableDevice(tableModel);
            counter = 0;
        }
        System.out.println("Counter :"+counter);
    }
}
