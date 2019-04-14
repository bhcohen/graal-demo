package org.example;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Person {

    private String first;

    private String last;
}
