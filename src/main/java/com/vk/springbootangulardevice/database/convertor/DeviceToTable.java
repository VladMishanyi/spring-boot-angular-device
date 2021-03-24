package com.vk.springbootangulardevice.database.convertor;

import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.database.table.TableModel;

import java.io.Serializable;

/**
 * Created by KIP-PC99 on 23.06.2018.
 */
public interface DeviceToTable<T extends DeviceModel, K extends DeviceModel, E extends TableModel> extends Serializable, Cloneable {

    E convert(T device);

    E convert(T device1, K device2);
}
