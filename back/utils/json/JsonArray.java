package com.utils.json;


import com.model.Point;
import com.model.Result;

import java.util.List;

public class JsonArray implements Jsonable
{
    private final StringBuilder builder = new StringBuilder();

    public JsonArray()
    {
    }

    public void append(boolean value)
    {
        builder.append(",").append(value ? "true" : "false");
    }

    public void append(int value)
    {
        builder.append(",").append(value);
    }

    public void append(double value)
    {
        builder.append(",").append(value);
    }

    public void append(String value)
    {
        builder.append(",\"").append(value).append("\"");
    }

    public void append(Jsonable value)
    {
        builder.append(",").append(value.toJson());
    }

    @Override
    public String toJson()
    {
        if (builder.length() != 0 && builder.charAt(0) == ',') builder.deleteCharAt(0);
        return "[" + builder.toString() + "]";
    }


    public static <T extends Jsonable> JsonArray from(List<Result> pointList)
    {
        Result[] points = pointList.toArray(new Result[pointList.size()]);

        JsonArray points_array = new JsonArray();

        for (Result point : points) {
            JsonObject obj = new JsonObject();
            obj.addProperty("x", point.getX());
            obj.addProperty("y", point.getY());
            obj.addProperty("r", point.getR());
            obj.addProperty("hit", point.getHit());
            obj.addProperty("exec_time", point.getExectime());
            obj.addProperty("date", point.getDate().toString());

            points_array.append(obj);
        }

        return points_array;
    }
}
