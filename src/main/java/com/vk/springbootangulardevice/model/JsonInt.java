package com.vk.springbootangulardevice.model;

import org.springframework.stereotype.Component;

@Component
public class JsonInt {
    private int content;

    public JsonInt() {
    }

    public JsonInt(int content) {
        this.content = content;
    }

    public int getContent() {
        return content;
    }

    public void setContent(int content) {
        this.content = content;
    }
}
