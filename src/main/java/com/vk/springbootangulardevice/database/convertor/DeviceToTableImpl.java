package com.vk.springbootangulardevice.database.convertor;

import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.database.table.TableModel;

import java.io.Serializable;

/**
 * Created by User on 2018-02-28.
 */
public class DeviceToTableImpl<T extends DeviceModel, K extends DeviceModel, E extends TableModel> implements Serializable, Cloneable {

    public E convert(final T device){
        return null;
    }

    public E convert(final T device1, final K device2){
        return null;
    }

}

