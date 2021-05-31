package com.vk.springbootangulardevice.model;

import org.springframework.stereotype.Component;

@Component
public class JsonShort {
    private short content;

    public JsonShort() {
    }

    public JsonShort(short content) {
        this.content = content;
    }

    public short getContent() {
        return content;
    }

    public void setContent(short content) {
        this.content = content;
    }
}
