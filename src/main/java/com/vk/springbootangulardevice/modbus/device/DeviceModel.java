package com.vk.springbootangulardevice.modbus.device;

import java.io.Serializable;

/**
 * Created by User on 2018-02-23.
 */
public interface DeviceModel extends Serializable, Cloneable {

    public boolean hysteresis();
}
