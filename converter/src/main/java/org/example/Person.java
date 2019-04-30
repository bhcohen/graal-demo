package org.example;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Person {

    private String first;

    private String last;
}
