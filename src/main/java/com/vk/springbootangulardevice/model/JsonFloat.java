package com.vk.springbootangulardevice.model;

import org.springframework.stereotype.Component;

@Component
public class JsonFloat {
    private float content;

    public JsonFloat() {
    }

    public JsonFloat(float content) {
        this.content = content;
    }

    public float getContent() {
        return content;
    }

    public void setContent(float content) {
        this.content = content;
    }
}
