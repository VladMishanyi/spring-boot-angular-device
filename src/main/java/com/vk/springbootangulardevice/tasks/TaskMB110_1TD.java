package com.vk.springbootangulardevice.tasks;


import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;

public interface TaskMB110_1TD extends TaskRoot<DeviceModelMB110_1TD, TableModelMB110_1TD, JsonBodyListForTableModelMB110_1TD, ServiceMB110_1TD, DeviceToTableMB110_1TD>{ }
