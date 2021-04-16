package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModel;
import com.vk.springbootangulardevice.json.JsonBodyListRoot;
import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.en.DigsFloat;
import com.vk.springbootangulardevice.model.ModelRaspberry;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseMB110_1TD;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseRoot;
import com.vk.springbootangulardevice.repository.modbus.RepositoryModbusMB110_1TD;
import com.vk.springbootangulardevice.repository.modbus.RepositoryModbusRoot;
import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
import com.vk.springbootangulardevice.repository.websocket.RepositoryWebsocketRoot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

//@Service
//@ComponentScan(basePackages = {"com.vk.servicesiliconezone.repository.database","com.vk.servicesiliconezone.repository.modbus"})
public abstract class ServiceRootImpl<T extends TableModel, J extends JsonBodyListRoot<T>, D extends DeviceModel, K extends RepositoryDatabaseRoot<T>, Y extends RepositoryModbusRoot<D>, W extends RepositoryWebsocketRoot<D>> implements ServiceRoot<T,J,D> {


    private final K repositoryDatabase;

    private final Y repositoryModbus;

    private final W repositoryWebsocket;

    private final RepositoryRaspberry repositoryRaspberry;

//    @Autowired
    public ServiceRootImpl(final K repositoryDatabase, final Y repositoryModbus, final W repositoryWebsocket, final RepositoryRaspberry repositoryRaspberry) {
        this.repositoryDatabase = repositoryDatabase;
        this.repositoryModbus = repositoryModbus;
        this.repositoryWebsocket = repositoryWebsocket;
        this.repositoryRaspberry = repositoryRaspberry;
    }

    @Transactional(readOnly = true)
    @Override
    public List<T> databaseFindByDateBetween (final LocalDateTime start, final LocalDateTime end){
        return repositoryDatabase.findByDateBetween(start, end);
    }
    @Override
    public abstract T databaseFindLastValueByDate ();
    @Transactional
    @Override
    public void databaseAddTableDevice(final T tableModel){
        repositoryDatabase.saveAndFlush(tableModel);
    }
    @Transactional
    @Override
    public void databaseAddAllTableDevice(final List<T> tableModelList){
        repositoryDatabase.saveAll(tableModelList);
    }

    public void websocketSendDevice(final D deviceModelDevice){
        repositoryWebsocket.messageSendDevice(deviceModelDevice);
    }

    public D modbusReadDataFromRegisterAll(){
        return repositoryModbus.readDataFromRegisterAll(true, (short) 0, (short) 500, DigsFloat.ONE_DIG, false);
    }

    @Override
    public ModelRaspberry raspberryReadGPIO27(){
        return repositoryRaspberry.raspberryReadGPIO27();
    }

    @Override
    public ModelRaspberry raspberryWriteGPI26(final boolean state){
        return repositoryRaspberry.raspberryWriteGPI26(state);
    }
}
