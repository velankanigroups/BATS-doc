/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ionicframework.bats940165;

import android.os.Bundle;
import org.apache.cordova.*;
import android.Manifest;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.sqlite.SQLiteDatabase;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.telephony.TelephonyManager;
import android.util.Log;
import org.apache.cordova.*;
import java.io.IOException;
import java.sql.SQLException;

public class MainActivity extends CordovaActivity
{ 
    private PendingIntent pendingIntent;
    private static final int MY_PERMISSIONS_REQUEST_READ_PHONE_STATE = 0;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
       Log.i("Welcome",">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Welcome Android<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
         System.out.println("its is running");
         try{
             Intent myIntent = new Intent(MainActivity.this, MyAlarmService.class);
            pendingIntent = PendingIntent.getBroadcast(MainActivity.this, 0, myIntent, 0);
            Log.i("Before ALARM", "initiating alarm service");
            AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
            alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 2000 , pendingIntent);
        }catch(Exception ex){
             System.out.println("error inside main activity ");
             ex.printStackTrace();
        }
    }
}
