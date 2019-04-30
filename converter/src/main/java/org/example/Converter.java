package org.example;

import com.fasterxml.jackson.databind.ObjectMapper;


public class Converter {

    public Converter() throws Exception {

        System.out.println("Java converter created");
    }

    public  Person convert(Person person) {

        System.out.println("Java is converting " + person.toString());

        return Person.builder()
                .first(person.getFirst().toUpperCase())
                .last(person.getLast().toUpperCase())
                .build();
    }

    public String convertToJSON(Person person) throws Exception {

        Person p = convert(person);

        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(p);
    }


}
