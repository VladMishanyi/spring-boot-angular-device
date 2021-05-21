package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.en.DigsFloat;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonFloat;
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
public class ServiceMB110_1TDImpl
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
    public ServiceMB110_1TDImpl(final RepositoryDatabaseMB110_1TD repositoryDatabase,
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

    @Override
    public DeviceModelMB110_1TD modbusReadDataFromRegister0(){
        return repositoryModbus.readDataFromRegister0(true, (short) -1000, (short) 1000, DigsFloat.ONE_DIG, false);
    }
    @Override
    public DeviceModelMB110_1TD modbusReadDataFromRegister3(){
        return repositoryModbus.readDataFromRegister3(true, (short) -1000, (short) 1000, false);
    }
    @Override
    public DeviceModelMB110_1TD modbusReadDataFromRegister4(){
        return repositoryModbus.readDataFromRegister4(true, (short) -1000, (short) 1000, false);
    }
    @Override
    public DeviceModelMB110_1TD modbusReadDataFromRegister5(){
        return repositoryModbus.readDataFromRegister5(true, (short) -1000, (short) 1000, DigsFloat.ONE_DIG, false);
    }
    @Override
    public DeviceModelMB110_1TD modbusReadDataFromRegister6(){
        return repositoryModbus.readDataFromRegister6(true, (short) -1000, (short) 1000, DigsFloat.ONE_DIG, false);
    }
    @Override
    public DeviceModelMB110_1TD modbusReadDataFromRegister7(){
        return repositoryModbus.readDataFromRegister7(true, (short) -1000, (short) 1000, DigsFloat.ONE_DIG, false);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister1(final short value){
        return repositoryModbus.writeDataToRegister1(value);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister2(final short value){
        return repositoryModbus.writeDataToRegister2(value);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister3(final short value){
        return repositoryModbus.writeDataToRegister3(value);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister4(final short value){
        return repositoryModbus.writeDataToRegister4(value);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister5(final float value){
        return repositoryModbus.writeDataToRegister5(value);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister6(final float value){
        return repositoryModbus.writeDataToRegister6(value);
    }
    @Override
    public DeviceModelMB110_1TD modbusWriteDataToRegister7(final float value){
        return repositoryModbus.writeDataToRegister7(value);
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
    @Override
    public void messageRealMeasuringValueFromSensor(DeviceModelMB110_1TD status){
        repositoryWebsocket.messageRealMeasuringValueFromSensor(status);
    }
}
