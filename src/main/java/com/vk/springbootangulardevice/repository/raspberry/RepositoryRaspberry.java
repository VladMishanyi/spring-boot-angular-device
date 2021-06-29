package com.vk.springbootangulardevice.repository.raspberry;

import com.vk.springbootangulardevice.model.ModelRaspberry;

public interface RepositoryRaspberry {

    public ModelRaspberry raspberryReadGPIO27();
    public ModelRaspberry raspberryWriteGPI26(final boolean state);
    public ModelRaspberry raspberryWriteGPI28(final boolean state);
}
