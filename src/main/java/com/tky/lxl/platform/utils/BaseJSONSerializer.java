package com.tky.lxl.platform.utils;

import java.lang.reflect.Proxy;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.sql.Clob;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONAware;
import com.alibaba.fastjson.JSONStreamAware;
import com.alibaba.fastjson.serializer.AppendableSerializer;
import com.alibaba.fastjson.serializer.ArraySerializer;
import com.alibaba.fastjson.serializer.AutowiredObjectSerializer;
import com.alibaba.fastjson.serializer.CalendarSerializer;
import com.alibaba.fastjson.serializer.CharsetSerializer;
import com.alibaba.fastjson.serializer.ClobSeriliazer;
import com.alibaba.fastjson.serializer.CollectionSerializer;
import com.alibaba.fastjson.serializer.DateSerializer;
import com.alibaba.fastjson.serializer.EnumSerializer;
import com.alibaba.fastjson.serializer.EnumerationSeriliazer;
import com.alibaba.fastjson.serializer.ExceptionSerializer;
import com.alibaba.fastjson.serializer.JSONAwareSerializer;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.JSONSerializerMap;
import com.alibaba.fastjson.serializer.JSONStreamAwareSerializer;
import com.alibaba.fastjson.serializer.ListSerializer;
import com.alibaba.fastjson.serializer.MapSerializer;
import com.alibaba.fastjson.serializer.NameFilter;
import com.alibaba.fastjson.serializer.ObjectSerializer;
import com.alibaba.fastjson.serializer.PropertyFilter;
import com.alibaba.fastjson.serializer.PropertyPreFilter;
import com.alibaba.fastjson.serializer.SerialContext;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializeWriter;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.TimeZoneSerializer;
import com.alibaba.fastjson.serializer.ValueFilter;
import com.alibaba.fastjson.util.ServiceLoader;

@SuppressWarnings("deprecation")
public class BaseJSONSerializer  extends JSONSerializer{

    private final SerializeConfig                  config;

    private final SerializeWriter                  out;

    private List<PropertyFilter>                   propertyFilters    = null;
    private List<ValueFilter>                      valueFilters       = null;
    private List<NameFilter>                       nameFilters        = null;
    private List<PropertyPreFilter>                propertyPreFilters = null;

    private int                                    indentCount        = 0;
    private String                                 indent             = "\t";

    private String                                 dateFormatPattern;
    private DateFormat                             dateFormat;

    private IdentityHashMap<Object, SerialContext> references         = null;
    private SerialContext                          context;

    public BaseJSONSerializer(){
        this(new SerializeWriter(), SerializeConfig.getGlobalInstance());
    }

    public BaseJSONSerializer(SerializeWriter out){
        this(out, SerializeConfig.getGlobalInstance());
    }

    public BaseJSONSerializer(SerializeConfig config){
        this(new SerializeWriter(), config);
    }

    @Deprecated
    public BaseJSONSerializer(JSONSerializerMap mapping){
        this(new SerializeWriter(), mapping);
    }

    public BaseJSONSerializer(SerializeWriter out, SerializeConfig config){
        this.out = out;
        this.config = config;
    }

    public String getDateFormatPattern() {
        if (dateFormat instanceof SimpleDateFormat) {
            return ((SimpleDateFormat) dateFormat).toPattern();
        }
        return dateFormatPattern;
    }

    public DateFormat getDateFormat() {
        if (dateFormat == null) {
            if (dateFormatPattern != null) {
                dateFormat = new SimpleDateFormat(dateFormatPattern);
            }
        }

        return dateFormat;
    }

    public void setDateFormat(DateFormat dateFormat) {
        this.dateFormat = dateFormat;
        if (dateFormatPattern != null) {
            dateFormatPattern = null;
        }
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormatPattern = dateFormat;
        if (this.dateFormat != null) {
            this.dateFormat = null;
        }
    }

    public SerialContext getContext() {
        return context;
    }

    public void setContext(SerialContext context) {
        this.context = context;
    }

    public void setContext(SerialContext parent, Object object, Object fieldName) {
        if (isEnabled(SerializerFeature.DisableCircularReferenceDetect)) {
            return;
        }

        this.context = new SerialContext(parent, object, fieldName);
        if (references == null) {
            references = new IdentityHashMap<Object, SerialContext>();
        }
        this.references.put(object, context);
    }

    public void setContext(Object object, Object fieldName) {
        this.setContext(context, object, fieldName);
    }

    public void popContext() {
        if (context != null) {
            this.context = this.context.getParent();
        }
    }

    
    public SerialContext getSerialContext(Object object) {
        if (references == null) {
            return null;
        }

        return references.get(object);
    }

    public boolean containsReference(Object value) {
    	return false;
    }

    public void writeReference(Object object) {
        SerialContext context = this.getContext();
        Object current = context.getObject();

        if (object == current) {
            out.write("{\"$ref\":\"@\"}");
            return;
        }

        SerialContext parentContext = context.getParent();

        if (parentContext != null) {
            if (object == parentContext.getObject()) {
                out.write("{\"$ref\":\"..\"}");
                return;
            }
        }

        SerialContext rootContext = context;
        for (;;) {
            if (rootContext.getParent() == null) {
                break;
            }
            rootContext = rootContext.getParent();
        }

        if (object == rootContext.getObject()) {
            out.write("{\"$ref\":\"$\"}");
            return;
        }

        SerialContext refContext = this.getSerialContext(object);

        String path = refContext.getPath();

        out.write("{\"$ref\":\"");
        out.write(path);
        out.write("\"}");
        return;
    }

    public List<ValueFilter> getValueFilters() {
        if (valueFilters == null) {
            valueFilters = new ArrayList<ValueFilter>();
        }

        return valueFilters;
    }

    public List<ValueFilter> getValueFiltersDirect() {
        return valueFilters;
    }

    public int getIndentCount() {
        return indentCount;
    }

    public void incrementIndent() {
        indentCount++;
    }

    public void decrementIdent() {
        indentCount--;
    }

    public void println() {
        out.write('\n');
        for (int i = 0; i < indentCount; ++i) {
            out.write(indent);
        }
    }

    public List<NameFilter> getNameFilters() {
        if (nameFilters == null) {
            nameFilters = new ArrayList<NameFilter>();
        }

        return nameFilters;
    }

    public List<NameFilter> getNameFiltersDirect() {
        return nameFilters;
    }

    public List<PropertyPreFilter> getPropertyPreFilters() {
        if (propertyPreFilters == null) {
            propertyPreFilters = new ArrayList<PropertyPreFilter>();
        }

        return propertyPreFilters;
    }

    public List<PropertyPreFilter> getPropertyPreFiltersDirect() {
        return propertyPreFilters;
    }

    public List<PropertyFilter> getPropertyFilters() {
        if (propertyFilters == null) {
            propertyFilters = new ArrayList<PropertyFilter>();
        }

        return propertyFilters;
    }

    public List<PropertyFilter> getPropertyFiltersDirect() {
        return propertyFilters;
    }

    public SerializeWriter getWriter() {
        return out;
    }

    public String toString() {
        return out.toString();
    }

    public void config(SerializerFeature feature, boolean state) {
        out.config(feature, state);
    }

    public boolean isEnabled(SerializerFeature feature) {
        return out.isEnabled(feature);
    }

    public void writeNull() {
        this.out.writeNull();
    }

    public SerializeConfig getMapping() {
        return config;
    }

    public ObjectSerializer getObjectWriter(Class<?> clazz) {
        ObjectSerializer writer = config.get(clazz);

        if (writer == null) {
            try {
                final ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
                for (Object o : ServiceLoader.load(AutowiredObjectSerializer.class, classLoader)) {
                    if (!(o instanceof AutowiredObjectSerializer)) {
                        continue;
                    }

                    AutowiredObjectSerializer autowired = (AutowiredObjectSerializer) o;
                    for (Type forType : autowired.getAutowiredFor()) {
                        config.put(forType, autowired);
                    }
                }
            } catch (ClassCastException ex) {
                // skip
            }

            writer = config.get(clazz);
        }

        if (writer == null) {
            final ClassLoader classLoader = JSON.class.getClassLoader();
            if (classLoader != Thread.currentThread().getContextClassLoader()) {
                try {
                    for (Object o : ServiceLoader.load(AutowiredObjectSerializer.class, classLoader)) {

                        if (!(o instanceof AutowiredObjectSerializer)) {
                            continue;
                        }

                        AutowiredObjectSerializer autowired = (AutowiredObjectSerializer) o;
                        for (Type forType : autowired.getAutowiredFor()) {
                            config.put(forType, autowired);
                        }
                    }
                } catch (ClassCastException ex) {
                    // skip
                }

                writer = config.get(clazz);
            }
        }

        if (writer == null) {
            if (Map.class.isAssignableFrom(clazz)) {
                config.put(clazz, MapSerializer.instance);
            } else if (List.class.isAssignableFrom(clazz)) {
                config.put(clazz, ListSerializer.instance);
            } else if (Collection.class.isAssignableFrom(clazz)) {
                config.put(clazz, CollectionSerializer.instance);
            } else if (Date.class.isAssignableFrom(clazz)) {
                config.put(clazz, DateSerializer.instance);
            } else if (JSONAware.class.isAssignableFrom(clazz)) {
                config.put(clazz, JSONAwareSerializer.instance);
            } else if (JSONStreamAware.class.isAssignableFrom(clazz)) {
                config.put(clazz, JSONStreamAwareSerializer.instance);
            } else if (clazz.isEnum() || (clazz.getSuperclass() != null && clazz.getSuperclass().isEnum())) {
                config.put(clazz, EnumSerializer.instance);
            } else if (clazz.isArray()) {
                Class<?> componentType = clazz.getComponentType();
                ObjectSerializer compObjectSerializer = getObjectWriter(componentType);
                config.put(clazz, new ArraySerializer(componentType, compObjectSerializer));
            } else if (Throwable.class.isAssignableFrom(clazz)) {
                config.put(clazz, new ExceptionSerializer(clazz));
            } else if (TimeZone.class.isAssignableFrom(clazz)) {
                config.put(clazz, TimeZoneSerializer.instance);
            } else if (Appendable.class.isAssignableFrom(clazz)) {
                config.put(clazz, AppendableSerializer.instance);
            } else if (Charset.class.isAssignableFrom(clazz)) {
                config.put(clazz, CharsetSerializer.instance);
            } else if (Enumeration.class.isAssignableFrom(clazz)) {
                config.put(clazz, EnumerationSeriliazer.instance);
            } else if (Calendar.class.isAssignableFrom(clazz)) {
                config.put(clazz, CalendarSerializer.instance);
            } else if (Clob.class.isAssignableFrom(clazz)) {
                config.put(clazz, ClobSeriliazer.instance);
            } else {
                boolean isCglibProxy = false;
                boolean isJavassistProxy = false;
                for (Class<?> item : clazz.getInterfaces()) {
                    if (item.getName().equals("net.sf.cglib.proxy.Factory")) {
                        isCglibProxy = true;
                        break;
                    } else if (item.getName().equals("javassist.util.proxy.ProxyObject")) {
                        isJavassistProxy = true;
                        break;
                    }
                }

                if (isCglibProxy || isJavassistProxy) {
                    Class<?> superClazz = clazz.getSuperclass();

                    ObjectSerializer superWriter = getObjectWriter(superClazz);
                    config.put(clazz, superWriter);
                    return superWriter;
                }

                if (Proxy.isProxyClass(clazz)) {
                    config.put(clazz, config.createJavaBeanSerializer(clazz));
                } else {
                    config.put(clazz, config.createJavaBeanSerializer(clazz));
                }
            }

            writer = config.get(clazz);
        }
        return writer;
    }

    public void close() {
        this.out.close();
    }
}

