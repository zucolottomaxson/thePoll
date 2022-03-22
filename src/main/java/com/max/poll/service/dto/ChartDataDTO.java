package com.max.poll.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class ChartDataDTO implements Serializable {
    private String key;
    private Long value;

    public ChartDataDTO(String key, Long value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ChartDataDTO)) return false;
        ChartDataDTO that = (ChartDataDTO) o;
        return getKey().equals(that.getKey());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getKey());
    }
}
