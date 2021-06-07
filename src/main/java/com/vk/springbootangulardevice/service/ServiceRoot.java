package com.vk.springbootangulardevice.service;



import com.vk.springbootangulardevice.database.table.TableModel;
import com.vk.springbootangulardevice.json.JsonBodyListRoot;
import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.model.ModelRaspberry;

import java.time.LocalDateTime;
import java.util.List;

public interface ServiceRoot<T extends TableModel, J extends JsonBodyListRoot<T>, D extends DeviceModel> {

//    J microserviceReadTableModelBetweenDate(final LocalDateTime start, final LocalDateTime end);
//    T microserviceReadTableModelLast();
//    D microserviceReadDeviceModelAllRegisters();

    List<T> databaseFindByDateBetween (final LocalDateTime start, final LocalDateTime end);
    T databaseFindLastValueByDate ();
    void databaseAddTableDevice(final T tableModel);
    void databaseAddAllTableDevice(final List<T> tableModelList);

    void websocketSendDevice(final D deviceModelDevice);

    D modbusReadDataFromRegisterAll();

//    public ModelRaspberry raspberryReadGPIO27();
//    public ModelRaspberry raspberryWriteGPI26(final boolean state);
//    public ModelRaspberry raspberryWriteGPI28(final boolean state);
}
