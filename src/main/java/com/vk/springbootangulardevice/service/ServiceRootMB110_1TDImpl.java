package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.en.DigsFloat;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonString;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseMB110_1TD;
import com.vk.springbootangulardevice.repository.modbus.RepositoryModbusMB110_1TD;
//import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
import com.vk.springbootangulardevice.repository.websocket.RepositoryWebsocketMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@ComponentScan(basePackages = {"com.vk.servicesiliconezone.repository.database","com.vk.servicesiliconezone.repository.modbus"})
public class ServiceRootMB110_1TDImpl
        extends ServiceRootImpl<TableModelMB110_1TD,
        JsonBodyListForTableModelMB110_1TD,
        DeviceModelMB110_1TD,
        RepositoryDatabaseMB110_1TD,
        RepositoryModbusMB110_1TD,
        RepositoryWebsocketMB110_1TD> implements ServiceMB110_1TD {


    private final RepositoryDatabaseMB110_1TD repositoryDatabase;

    private final RepositoryModbusMB110_1TD repositoryModbus;

    private final RepositoryWebsocketMB110_1TD repositoryWebsocket;

//    private final RepositoryRaspberry repositoryRaspberry;

    @Autowired
    public ServiceRootMB110_1TDImpl(final RepositoryDatabaseMB110_1TD repositoryDatabase,
                                    final RepositoryModbusMB110_1TD repositoryModbus,
                                    final RepositoryWebsocketMB110_1TD repositoryWebsocket/*,
                                    final RepositoryRaspberry repositoryRaspberry*/) {
        super(repositoryDatabase, repositoryModbus, repositoryWebsocket/*, repositoryRaspberry*/);
        this.repositoryDatabase = repositoryDatabase;
        this.repositoryModbus = repositoryModbus;
        this.repositoryWebsocket = repositoryWebsocket;
//        this.repositoryRaspberry = repositoryRaspberry;
    }

    @Transactional(readOnly = true)
    @Override
    public TableModelMB110_1TD databaseFindLastValueByDate (){
        return repositoryDatabase.findLastValueByDate();
    }

    public DeviceModelMB110_1TD modbusReadDataFromRegister0(){
        return repositoryModbus.readDataFromRegister0(true, (short) -1000, (short) 1000, DigsFloat.ONE_DIG, false);
    }
    public DeviceModelMB110_1TD modbusReadDataFromRegister1(){
        return repositoryModbus.readDataFromRegister0(true, (short) -1000, (short) 1000, DigsFloat.ONE_DIG, false);
    }
    public DeviceModelMB110_1TD modbusWriteDataToRegister0(final short value){
        return repositoryModbus.writeDataToRegister0(value);
    }
    public DeviceModelMB110_1TD modbusWriteDataToRegister1(final short value){
        return repositoryModbus.writeDataToRegister1(value);
    }

    @Override
    public void messageTimerStatus(JsonBoolean status){
        repositoryWebsocket.messageTimerStatus(status);
    }
    @Override
    public void messageContactStatus(JsonBoolean status){
        repositoryWebsocket.messageContactStatus(status);
    }
    @Override
    public void messageTextStatus(JsonString status){
        repositoryWebsocket.messageTextStatus(status);
    }
}
