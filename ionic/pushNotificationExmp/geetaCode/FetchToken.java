package com.ionicframework.bats940165;;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.content.ContentValues;
import java.io.File;
import java.sql.SQLException;

/**
 * Created by dell on 6/10/2016.
 */
public class FetchToken extends SQLiteOpenHelper {
    private static final String TOKEN_COLUMN_NAME = "token";
     private static final String NOTIFICATION_COLUMN_NAME = "data";
    private static String DB_PATH = "";
    private static String DB_NAME = "BATS.db";
    public String tokenvalue;
    private SQLiteDatabase myDataBase;

    public FetchToken(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        if(android.os.Build.VERSION.SDK_INT >= 17){
            DB_PATH = context.getApplicationInfo().dataDir + "/databases/";
        }
        else
        {
            DB_PATH = "/data/data/" + context.getPackageName() + "/databases/";
        }
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    public void setNotification(String noti) throws SQLException{ 
       Log.i("INSERT",noti+"======================================================");
        openDataBase();
        boolean dbExist = checkDataBase();

        if(dbExist){
            Log.i("DB EXIST", "=====================================DB notification EXIST=========================");
            openDataBase();
            //myDataBase.execSQL("CREATE TABLE IF NOT EXISTS Device_IMEI(imei VARCHAR);");
            String query = "INSERT INTO Notification (data) VALUES('"+noti+"');";
            myDataBase.execSQL(query);
         //   myDataBase.close;
        } else {
            Log.i("DB NOT CREATED", "=========================================DB NOTIFICSTION NOT CREATED===========================");
        }
        Log.i("DB EXIST","=====================================going to add notification in notification table=========================");
        // SQLiteDatabase db = this.getWritableDatabase();  
        // ContentValues values = new ContentValues();  
        // values.put(NOTIFICATION_COLUMN_NAME, noti); // Contact Name  
        // // values.put(KEY_PH_NO, contact.getPhoneNumber()); // Contact Phone  
        //    // Inserting Row  
        // db.insert("Notification", null, values);  
        // //2nd argument is String containing nullColumnHack  
        // db.close(); // Closing database connection  
        //  Log.i("DB EXIST","=====================================Its done=========================");
       
    }


    public String tokenValue() throws SQLException {
        boolean dbExist = checkDataBase();
        if(dbExist){
            Log.i("DB EXIST","=====================================DB TOKEN EXIST=========================");
            openDataBase();
            Cursor res =  myDataBase.rawQuery( "select * from Token", null );
            res.moveToFirst();
            while(res.isAfterLast() == false){
                tokenvalue = res.getString(res.getColumnIndex(TOKEN_COLUMN_NAME));
                res.moveToNext();
            }
          //  myDataBase.close;
        }
        else{
            Log.i("DB NOT CREATED","=========================================DB TOKEN NOT CREATED===========================");
        }
        return tokenvalue;
    }
    /**
     * Check if the database already exist to avoid re-copying the file each time you open the application.
     * @return true if it exists, false if it doesn't
     */
    private boolean checkDataBase(){
        File dbFile = new File(DB_PATH + DB_NAME);
        Log.v("dbFile", dbFile + "   "+ dbFile.exists());
        return dbFile.exists();
    }
    public void openDataBase() throws SQLException {
        //Open the database
        String myPath = DB_PATH + DB_NAME;
        myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READWRITE);

    }
}
