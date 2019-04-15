package org.example;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class Converter {

    public Converter() throws Exception {

        System.out.println("creating converter");
        
        System.out.println("converter created");

    }
    public  Person convert(Map<String,String> map) {

        System.out.println("converting map " + map.toString());

        return Person.builder()
                .first(map.get("first").toUpperCase())
                .last(map.get("last").toUpperCase())
                .build();
    }

    public String convertToJSON(Map<String,String> map) throws Exception {

        Person person = convert(map);

        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(person);
    }
}
