//package com.vk.springbootangulardevice.repository.raspberry;
//
//import com.pi4j.io.gpio.*;
//import com.pi4j.io.gpio.event.GpioPinDigitalStateChangeEvent;
//import com.pi4j.io.gpio.event.GpioPinListenerDigital;
//import com.vk.springbootangulardevice.model.ModelRaspberry;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.stereotype.Repository;
//
//import java.util.function.Consumer;
//
//@Repository
//@ComponentScan(basePackages = {"com.vk.springbootangulardevice.config", "com.vk.springbootangulardevice.model"})
//public class RepositoryRaspberryImpl implements RepositoryRaspberry{
//    private final ModelRaspberry modelRaspberry;
//
////    private final GpioController gpioController;
//
//    private final GpioPinDigitalInput gpioPinDigitalInput27;
//
//    private final GpioPinDigitalOutput gpioPinDigitalOutput26;
//
//    private final GpioPinDigitalOutput gpioPinDigitalOutput28;
//
//    @Autowired
//    public RepositoryRaspberryImpl(final ModelRaspberry modelRaspberry,
//                                   final GpioController gpioController) {
//        this.modelRaspberry = modelRaspberry;
//        gpioPinDigitalInput27 = gpioController.provisionDigitalInputPin(RaspiPin.GPIO_27, PinPullResistance.PULL_UP);
//        gpioPinDigitalInput27.setShutdownOptions(true);
//        gpioPinDigitalOutput26 = gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_26, "input26", PinState.HIGH);
//        gpioPinDigitalOutput26.setShutdownOptions(true, PinState.HIGH);
//        gpioPinDigitalOutput28 = gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_28, "input28", PinState.HIGH);
//        gpioPinDigitalOutput26.setShutdownOptions(true, PinState.HIGH);
//        this.raspberryReadGPIO27();
//    }
//
//    @Override
//    public ModelRaspberry raspberryReadGPIO27() {
////        gpioPinDigitalInput27.addListener(new GpioPinListenerDigital() {
////            @Override
////            public void handleGpioPinDigitalStateChangeEvent(GpioPinDigitalStateChangeEvent event) {
////                // display pin state on console
////                System.out.println(" --> GPIO PIN STATE CHANGE: " + event.getPin() + " = " + event.getState());
////            }
////        });
//        gpioPinDigitalInput27.addListener((GpioPinListenerDigital) event -> {
//            // display pin state on console
//            // need inversion because using pull_up resistors
//            boolean state = !event.getState().isHigh();
//            System.out.println(" --> GPIO PIN STATE CHANGE: " + event.getPin() + " = " + state);
//            modelRaspberry.setGpio27(state);
//        });
//        return modelRaspberry;
//    }
//
//    @Override
//    public ModelRaspberry raspberryWriteGPI26(final boolean state) {
//        if (state) {
//            gpioPinDigitalOutput26.high();
//        } else {
//            gpioPinDigitalOutput26.low();
//        }
//        modelRaspberry.setGpio26(gpioPinDigitalOutput26.getState().isHigh());
//        return modelRaspberry;
//    }
//
//    @Override
//    public ModelRaspberry raspberryWriteGPI28(final boolean state) {
//        if (state) {
//            gpioPinDigitalOutput28.high();
//        } else {
//            gpioPinDigitalOutput28.low();
//        }
//        modelRaspberry.setGpio28(gpioPinDigitalOutput28.getState().isHigh());
//        return modelRaspberry;
//    }
//}
