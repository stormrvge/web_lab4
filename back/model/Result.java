package com.model;

import com.utils.json.JsonObject;
import com.utils.json.Jsonable;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "dots")
public class Result implements Jsonable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "owner")
    private String userId;

    @Column(name = "x")
    private double x;

    @Column(name = "y")
    private double y;

    @Column(name = "r")
    private double r;

    @Column(name = "hit")
    private Boolean hit;

    @Column(name = "date")
    private LocalTime date;

    @Column(name = "exectime")
    private long exectime;

    public Result()
    {
        this.hit = false;
    }

    public Result(double x, double y, double r,
                  boolean hit, LocalTime date, long workTime, String username )
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.date = date;
        this.exectime = workTime;
        this.userId = username;
    }

    @Override
    public String toJson()
    {
        JsonObject object = new JsonObject();

        object.addProperty("x", x);
        object.addProperty("y", y);
        object.addProperty("r", r);
        object.addProperty("hit", hit);
        object.addProperty("date", date.toString());
        object.addProperty("exectime", exectime);

        return object.toJson();
    }
}
