package com.vk.springbootangulardevice.modbus;

import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by KIP-PC99 on 14.09.2018.
 */
@Component
public class ModbusShortImpl extends RootModbusImpl<Short> implements ModbusShort{

    @Override
    synchronized void setValuesDefault(final List<Short> list, final int length) {
        for (int i=0; i<=length; i++){
            list.add((short) 0);
        }
    }

    @Override
    Short borderValue(short bMin, short bMax, Short val){
        if (val >= bMax) return bMax;
        if (val <= bMin) return bMin;
        return val;
    }
}
