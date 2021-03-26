package com.vk.springbootangulardevice.tasks;


import com.vk.springbootangulardevice.database.convertor.DeviceToTable;
import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModel;
import com.vk.springbootangulardevice.json.JsonBodyListRoot;
import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceRoot;

public interface TaskRoot<D extends DeviceModel, T extends TableModel, J extends JsonBodyListRoot<T>, S extends ServiceRoot<T,J,D>, DT extends DeviceToTable<D,D,T>> {

    public S getService();

    public D getDeviceModel();

    public DT getDeviceToTable();

    void readModbusAndWriteToTable();

}
