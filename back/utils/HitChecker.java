package com.utils;

public class HitChecker {
    public static boolean isInArea(double x, double y, double r)
    {
        boolean success = false;

        if (r > 0) {
            if(x >= 0 && y <= 0)
            {
                success = (x <= r/2 && y >= -r);
            }
            else if (x <= 0 && y <= 0)
            {
                success = (x * x + y * y <= r * r / 4);
            }
            else if (x >= 0 && y >= 0)
            {
                success = (y <= (-x + r) / 2);
            }
        } else {
            if (x >= 0 && y >= 0) {
                success = (x * x + y * y <= r * r / 4);
            }
            else if (x <= 0 && y >= 0) {
                success = (x >= r/2 && y <= -r);
            }
            else if (x <= 0 && y <= 0) {
                success = (y >= (r - x) / 2);
            }
        }

        return success;
    }
}
