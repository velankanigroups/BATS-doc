package com.ionicframework.bats940165;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.AlarmManager;
import android.app.Service;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.location.Address;
import android.location.Geocoder;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.text.format.DateFormat;
import android.util.Log;
import android.content.Context;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.apache.http.entity.StringEntity;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import android.content.BroadcastReceiver;


import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;


public class MyAlarmService extends BroadcastReceiver  {
    private NotificationManager mManager;
    Notification myNotification;
    public String apiURL = "http://220.227.124.134:8054/"; //dev server
    // public String apiURL = "http://45.114.245.79:8068/"; //test server
    public String tokenValue;
    Context ctxt;
    // public List<String> deviceArray =new ArrayList<String>();

 @Override
    public void onReceive(Context context, Intent intent) {
        ctxt=context;
       // super.onStart(intent, startId);
        System.out.println("@@@@@@ inside onStart");
        SQLiteDatabase.CursorFactory factory = null;
         tokenObj=new FetchToken(ctxt,"my",factory,1);
        try {
        tokenValue=tokenObj.tokenValue();

        if(tokenObj.tokenValue()!=null){
            System.out.println("TOKEN VALUE"+"============================="+tokenObj.tokenValue()+"============================");
            Log.i("MyAlarmService", "!@#$%^&*(!@#$%^&*(!@#$%^&*())!@#$%^&*(!@#$%^&*(!@#$%^&*()");
            String deviceAlarm="b2capp/device/alarmnotifications";
            Log.i("Start API Call", "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            try{
                if(isConnected()){
                     new RestOperation().execute(deviceAlarm);
                }
                else{
                    System.out.println("internet connetion");
                    }
            }catch(Exception ex){
                System.out.println("Some error came so im in exceprtion");
                ex.printStackTrace();
            }
        }
        else{
            Log.i("TOKEN NOT UPDATED","=============================================TOKEN NOT AVAILABLE=====================================");
        }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // Log.i("MyReceiver", "its running");
        // Intent service1 = new Intent(context, MyAlarmService.class);
        // context.startService(service1);
    }

    // @Nullable
    // @Override
    // public IBinder onBind(Intent intent) {
    //     return null;
    // }
    // @Override
    // public void onCreate() {
    //     super.onCreate();
    // }
     public boolean isConnected() {
         
        ConnectivityManager connectivityManager 
              = (ConnectivityManager) ctxt.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected())
            return true;
        else
            return false;
    }
FetchToken tokenObj;
    // @Override
    // public void onStart(Intent intent, int startId) {
    //     super.onStart(intent, startId);
    //     // System.out.println("@@@@@@ inside onStart");
    //     // SQLiteDatabase.CursorFactory factory = null;
    //     //  tokenObj=new FetchToken(this,"my",factory,1);
    //     // try {
    //     // tokenValue=tokenObj.tokenValue();

    //     // if(tokenObj.tokenValue()!=null){
    //     //     Log.i("TOKEN VALUE","============================="+tokenObj.tokenValue()+"============================");
    //     //     Log.i("MyAlarmService", "!@#$%^&*(!@#$%^&*(!@#$%^&*())!@#$%^&*(!@#$%^&*(!@#$%^&*()");
    //     //     String deviceAlarm="b2capp/device/alarmnotifications";
    //     //     Log.i("Start API Call", "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    //     //     try{
    //     //         if(isConnected()){
    //     //              new RestOperation().execute(deviceAlarm);
    //     //         }
    //     //         else{
    //     //             System.out.println("internet connetion");
    //     //             }
    //     //     }catch(Exception ex){
    //     //         System.out.println("Some error came so im in exceprtion");
    //     //         ex.printStackTrace();
    //     //     }
    //     // }
    //     // else{
    //     //     Log.i("TOKEN NOT UPDATED","=============================================TOKEN NOT AVAILABLE=====================================");
    //     // }
    //     // } catch (SQLException e) {
    //     //     e.printStackTrace();
    //     // }

    // }
    class RestOperation extends AsyncTask<String, Integer, String> {

        @Override
        protected String doInBackground(String... params) {
          
               return fetchAlarmData(apiURL + "b2capp/device/alarmnotifications");
                    //  return "string";
        }

        @Override
        protected void onPostExecute(String result) {
           // super.onPostExecute(result);
            
            try{
                System.out.println("notification RESULT"+ result);
                JSONObject notifDat=new JSONObject(result);
                String data=notifDat.getString("data");
            }catch(JSONException e){
                try{
                    JSONObject expire=new JSONObject(result);
                    String data=expire.getString("err");
                    if(data.equalsIgnoreCase("Expired Session")){

                        Intent myIntent = new Intent(ctxt, MyReceiver.class);
                        PendingIntent pendingIntent = PendingIntent.getBroadcast(ctxt, 0, myIntent, 0);
                        AlarmManager alarmManager = (AlarmManager)ctxt.getSystemService(Context.ALARM_SERVICE);
                        alarmManager.cancel(pendingIntent);
                        pendingIntent.cancel();
                        System.out.println("alarm cancel by me hahahaha :)");

                        }
                }catch(JSONException ee){
                    SQLiteDatabase.CursorFactory factory = null;
                    System.out.println("Goiing to show notification");
                    showNotification(result);
                    try{
                        tokenObj.setNotification(result);
                    }catch(SQLException ef){
                        ef.printStackTrace();
                    }
                   ee.printStackTrace();
               }catch(NullPointerException  fg){
                   fg.printStackTrace();
               }catch(Exception g){
                   g.printStackTrace();
               }
                              // e.printStackTrace();
            }

      }
    }

    private String fetchAlarmData(String url){
        System.out.println("Inside fetch notification");
        InputStream inputStream = null;
        String res = "";
        String result = null;
        String json = "";
        try {
           // String token = sharedPreferences.getString("token", null);
            //String URL=sharedPreferences.getString("url", null);
            System.out.println("token inside data condition :"+tokenValue +url);
            //created HttpClient
            HttpClient httpclient = new DefaultHttpClient();

            //made POST request to the given URL
            HttpPost httpPost = new HttpPost(url);

          
            //JsonArray
            JSONObject jsonObject2 = new JSONObject();
            jsonObject2.accumulate("token", tokenValue);
         
            //converted JSONObject to JSON to String
            json = jsonObject2.toString();
            System.out.print("json " + jsonObject2);

            //json to StringEntity
            StringEntity se = new StringEntity(json);

            //set httpPost Entity
            httpPost.setEntity(se);

            //Set some headers to inform server about the type of the content
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");
            // httpPost.setHeader("Content-Length", se.getContentLength()+"");

            //Executed POST request to the given URL
            HttpResponse httpResponse = httpclient.execute(httpPost);

            //received response as inputStream
            inputStream = httpResponse.getEntity().getContent();

            //converted inputstream to string
            System.out.println("F22222"+inputStream );
            result = convertInputStreamToString(inputStream);
        } catch (ClientProtocolException cpe) {
            System.out.println("First Exception caz of HttpResponese :" + cpe);
            cpe.printStackTrace();
            } 
        catch (Exception e) {
            Log.d("IN UPDATE EXCEPTION ", "");
            e.printStackTrace();
             }
        return result;
    }

    private static String convertInputStreamToString(InputStream inputStream) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while ((line = bufferedReader.readLine()) != null)
            result += line;

        inputStream.close();
        return result;

    }

    public void showNotification(String result){
        try{
            System.out.println("inside show notification"+result);
            JSONArray jsonArray=new JSONArray(result);
            for(int i=0;i<jsonArray.length();i++){
                String notify_heading="Bats Alarm";
                JSONObject alarmObject = jsonArray.getJSONObject(i);
                // String type=alarmObject.getString("alarm_type");
               // System.out.println(type+"\n"+alarmObject.get("alarm_type").getClass()+" JsonObject "+alarmObject);
               
                if(alarmObject.getString("alarm_type").equalsIgnoreCase("0")){
                    notify_heading = "Panic";
                  // System.out.println("panic alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("1")){
                    notify_heading = "Tamper Sim";
                   // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("2")){
                     notify_heading = "Tamper Top";
                    // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("3")){
                     notify_heading = "Battery";
                    // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("4")){
                     notify_heading = "Overspeed";
                   //  System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("5")){
                    notify_heading = "Geofence";
                   // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("6")){
                    notify_heading = "Sanity alarm";
                   // System.out.println("alarm_type"+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("7")){
                    notify_heading = "Connection to tracker intrrupted";
                   // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("8")){
                    notify_heading ="Robbery / Theft alarm";
                   // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("9")){
                     notify_heading = "Tracker sim changed";
                    // System.out.println("alarm_type "+notify_heading);
                }
                else if(alarmObject.getString("alarm_type").equalsIgnoreCase("10")){
                     notify_heading = "Warning";
                     //System.out.println("alarm_type "+notify_heading);
                }
                //System.out.println("bats_alarm "+notify_heading + alarmObject.getString("alarm_type"));
                    String notificationString;
                    notificationString=alarmObject.getString("vehicle_name")+" | "+alarmObject.getString("vehicle_num");
                    callNotification(notify_heading,notificationString);
            }
        }catch(JSONException e){
            e.printStackTrace();
        }
    }

public void callNotification(String alarmName,String notificationString){
    System.out.println(ctxt+"inside call notification alarm_name "+alarmName);
     mManager = (NotificationManager)ctxt.getSystemService(Context.NOTIFICATION_SERVICE);
        Intent intent1 = new Intent(ctxt,MainActivity.class);
        PendingIntent pendingNotificationIntent = PendingIntent.getActivity( ctxt,0, intent1,PendingIntent.FLAG_UPDATE_CURRENT);
        Notification.Builder builder = new Notification.Builder(ctxt);
        builder.setAutoCancel(false);
        builder.setTicker("ByDesign Tracker Alarm");
        builder.setContentTitle(alarmName);
        builder.setContentText(notificationString);
        builder.setSmallIcon(R.drawable.icon);
        builder.setContentIntent(pendingNotificationIntent);
        builder.setOngoing(true);
        builder.setAutoCancel(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            builder.build();
        }
        Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        builder.setSound(alarmSound);
        myNotification = builder.getNotification();
        myNotification.flags=  Notification.FLAG_ONLY_ALERT_ONCE | Notification.FLAG_AUTO_CANCEL ;

        mManager.notify((int)System.currentTimeMillis(), myNotification);
}
      
   
}
