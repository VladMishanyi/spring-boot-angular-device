package com.vk.springbootangulardevice.model;

import org.springframework.stereotype.Component;

@Component
public class JsonBoolean {
    private boolean content;

    public JsonBoolean() {
    }

    public JsonBoolean(boolean content) {
        this.content = content;
    }

    public boolean isContent() {
        return content;
    }

    public void setContent(boolean content) {
        this.content = content;
    }
}
