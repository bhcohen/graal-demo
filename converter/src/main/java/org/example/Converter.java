package org.example;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class Converter {

    public Converter() throws Exception {

        System.out.println("creating converter");

        //Thread.currentThread().sleep(2000);

        System.out.println("converter created");

    }
    public  Person convert(Map<String,String> map) {

        System.out.println("converting map " + map.toString());

        return Person.builder()
                .first(map.get("first"))
                .last(map.get("last"))
                .build();
    }

    public String convertToJSON(Map<String,String> map) throws Exception {

        Person person = convert(map);

        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(person);
    }
}
