package com.tky.lxl.platform.utils;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharsetDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONAware;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONStreamAware;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.parser.DefaultJSONParser;
import com.alibaba.fastjson.parser.DefaultJSONParser.ResolveTask;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.parser.JSONLexer;
import com.alibaba.fastjson.parser.JSONToken;
import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.parser.deserializer.FieldDeserializer;
import com.alibaba.fastjson.serializer.NameFilter;
import com.alibaba.fastjson.serializer.PropertyFilter;
import com.alibaba.fastjson.serializer.PropertyPreFilter;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializeFilter;
import com.alibaba.fastjson.serializer.SerializeWriter;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.ValueFilter;
import com.alibaba.fastjson.util.FieldInfo;
import com.alibaba.fastjson.util.IOUtils;
import com.alibaba.fastjson.util.ThreadLocalCache;
import com.alibaba.fastjson.util.TypeUtils;

public abstract class BaseJSON implements JSONStreamAware, JSONAware {

	public static String DEFAULT_TYPE_KEY = "@type";
	private static Logger Log = LoggerFactory.getLogger(BaseJSON.class);

	public static int DEFAULT_PARSER_FEATURE;
	static {
		int features = 0;
		features |= Feature.AutoCloseSource.getMask();
		features |= Feature.InternFieldNames.getMask();
		features |= Feature.UseBigDecimal.getMask();
		features |= Feature.AllowUnQuotedFieldNames.getMask();
		features |= Feature.AllowSingleQuotes.getMask();
		features |= Feature.AllowArbitraryCommas.getMask();
		features |= Feature.SortFeidFastMatch.getMask();
		features |= Feature.IgnoreNotMatch.getMask();
		DEFAULT_PARSER_FEATURE = features;
	}

	public static String DEFFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

	public static int DEFAULT_GENERATE_FEATURE;
	static {
		int features = 0;
		features |= com.alibaba.fastjson.serializer.SerializerFeature.QuoteFieldNames.getMask();
		features |= com.alibaba.fastjson.serializer.SerializerFeature.SkipTransientField.getMask();
		features |= com.alibaba.fastjson.serializer.SerializerFeature.WriteEnumUsingToString.getMask();
		features |= com.alibaba.fastjson.serializer.SerializerFeature.SortField.getMask();
		// features |=
		// com.alibaba.fastjson.serializer.SerializerFeature.WriteSlashAsSpecial.getMask();
		DEFAULT_GENERATE_FEATURE = features;
	}

	public static final Object parse(String text) {
		return parse(text, DEFAULT_PARSER_FEATURE);
	}

	public static final Object parse(String text, int features) {
		if (text == null) {
			return null;
		}

		DefaultJSONParser parser = new DefaultJSONParser(text, ParserConfig.getGlobalInstance(), features);
		Object value = parser.parse();

		handleResovleTask(parser, value);

		parser.close();

		return value;
	}

	public static final Object parse(byte[] input, Feature... features) {
		return parse(input, 0, input.length, ThreadLocalCache.getUTF8Decoder(), features);
	}

	public static final Object parse(byte[] input, int off, int len, CharsetDecoder charsetDecoder,
			Feature... features) {
		if (input == null || input.length == 0) {
			return null;
		}

		int featureValues = DEFAULT_PARSER_FEATURE;
		for (Feature featrue : features) {
			featureValues = Feature.config(featureValues, featrue, true);
		}

		return parse(input, off, len, charsetDecoder, featureValues);
	}

	public static final Object parse(byte[] input, int off, int len, CharsetDecoder charsetDecoder, int features) {
		charsetDecoder.reset();

		int scaleLength = (int) (len * (double) charsetDecoder.maxCharsPerByte());
		char[] chars = ThreadLocalCache.getChars(scaleLength);

		ByteBuffer byteBuf = ByteBuffer.wrap(input, off, len);
		CharBuffer charBuf = CharBuffer.wrap(chars);
		IOUtils.decode(charsetDecoder, byteBuf, charBuf);

		int position = charBuf.position();

		DefaultJSONParser parser = new DefaultJSONParser(chars, position, ParserConfig.getGlobalInstance(), features);
		Object value = parser.parse();

		handleResovleTask(parser, value);

		parser.close();

		return value;
	}

	public static final Object parse(String text, Feature... features) {
		int featureValues = DEFAULT_PARSER_FEATURE;
		for (Feature featrue : features) {
			featureValues = Feature.config(featureValues, featrue, true);
		}

		return parse(text, featureValues);
	}

	public static final JSONObject parseObject(String text, Feature... features) {
		return (JSONObject) parse(text, features);
	}

	public static final JSONObject parseObject(String text) {
		Object obj = parse(text);
		if (obj instanceof JSONObject) {
			return (JSONObject) obj;
		}

		return (JSONObject) BaseJSON.toJSON(obj);
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(String text, TypeReference<T> type, Feature... features) {
		return (T) parseObject(text, type.getType(), ParserConfig.getGlobalInstance(), DEFAULT_PARSER_FEATURE,
				features);
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(String text, Class<T> clazz, Feature... features) {
		return (T) parseObject(text, (Type) clazz, ParserConfig.getGlobalInstance(), DEFAULT_PARSER_FEATURE, features);
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(String input, Type clazz, Feature... features) {
		return (T) parseObject(input, clazz, ParserConfig.getGlobalInstance(), DEFAULT_PARSER_FEATURE, features);
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(String input, Type clazz, int featureValues, Feature... features) {
		if (input == null) {
			return null;
		}

		for (Feature featrue : features) {
			featureValues = Feature.config(featureValues, featrue, true);
		}

		DefaultJSONParser parser = new DefaultJSONParser(input, ParserConfig.getGlobalInstance(), featureValues);
		T value = (T) parser.parseObject(clazz);

		handleResovleTask(parser, value);

		parser.close();

		return value;
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(String input, Type clazz, ParserConfig config, int featureValues,
			Feature... features) {
		if (input == null) {
			return null;
		}

		for (Feature featrue : features) {
			featureValues = Feature.config(featureValues, featrue, true);
		}

		DefaultJSONParser parser = new DefaultJSONParser(input, config, featureValues);
		T value = (T) parser.parseObject(clazz);

		handleResovleTask(parser, value);

		parser.close();

		return value;
	}

	public static <T> int handleResovleTask(DefaultJSONParser parser, T value) {
		int size = parser.getResolveTaskList().size();
		for (int i = 0; i < size; ++i) {
			ResolveTask task = parser.getResolveTaskList().get(i);
			FieldDeserializer fieldDeser = task.getFieldDeserializer();

			Object object = null;
			if (task.getOwnerContext() != null) {
				object = task.getOwnerContext().getObject();
			}

			String ref = task.getReferenceValue();
			Object refValue;
			if (ref.startsWith("$")) {
				refValue = parser.getObject(ref);
			} else {
				refValue = task.getContext().getObject();
			}
			fieldDeser.setValue(object, refValue);
		}

		return size;
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(byte[] input, Type clazz, Feature... features) {
		return (T) parseObject(input, 0, input.length, ThreadLocalCache.getUTF8Decoder(), clazz, features);
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(byte[] input, int off, int len, CharsetDecoder charsetDecoder, Type clazz,
			Feature... features) {
		charsetDecoder.reset();

		int scaleLength = (int) (len * (double) charsetDecoder.maxCharsPerByte());
		char[] chars = ThreadLocalCache.getChars(scaleLength);

		ByteBuffer byteBuf = ByteBuffer.wrap(input, off, len);
		CharBuffer charByte = CharBuffer.wrap(chars);
		IOUtils.decode(charsetDecoder, byteBuf, charByte);

		int position = charByte.position();

		return (T) parseObject(chars, position, clazz, features);
	}

	@SuppressWarnings("unchecked")
	public static final <T> T parseObject(char[] input, int length, Type clazz, Feature... features) {
		if (input == null || input.length == 0) {
			return null;
		}

		int featureValues = DEFAULT_PARSER_FEATURE;
		for (Feature featrue : features) {
			featureValues = Feature.config(featureValues, featrue, true);
		}

		DefaultJSONParser parser = new DefaultJSONParser(input, length, ParserConfig.getGlobalInstance(),
				featureValues);
		T value = (T) parser.parseObject(clazz);

		handleResovleTask(parser, value);

		parser.close();

		return value;
	}

	public static final <T> T parseObject(String text, Class<T> clazz) {
		return parseObject(text, clazz, new Feature[0]);
	}

	public static final JSONArray parseArray(String text) {
		if (text == null) {
			return null;
		}

		DefaultJSONParser parser = new DefaultJSONParser(text, ParserConfig.getGlobalInstance());

		JSONArray array;

		JSONLexer lexer = parser.getLexer();
		if (lexer.token() == JSONToken.NULL) {
			lexer.nextToken();
			array = null;
		} else if (lexer.token() == JSONToken.EOF) {
			array = null;
		} else {
			array = new JSONArray();
			parser.parseArray(array);

			handleResovleTask(parser, array);
		}

		parser.close();

		return array;
	}

	public static final <T> List<T> parseArray(String text, Class<T> clazz) {
		if (text == null) {
			return null;
		}

		List<T> list;

		DefaultJSONParser parser = new DefaultJSONParser(text, ParserConfig.getGlobalInstance());
		JSONLexer lexer = parser.getLexer();
		if (lexer.token() == JSONToken.NULL) {
			lexer.nextToken();
			list = null;
		} else {
			list = new ArrayList<T>();
			parser.parseArray(clazz, list);

			handleResovleTask(parser, list);
		}

		parser.close();

		return list;
	}

	public static final List<Object> parseArray(String text, Type[] types) {
		if (text == null) {
			return null;
		}

		List<Object> list;

		DefaultJSONParser parser = new DefaultJSONParser(text, ParserConfig.getGlobalInstance());
		Object[] objectArray = parser.parseArray(types);
		if (objectArray == null) {
			list = null;
		} else {
			list = Arrays.asList(objectArray);
		}

		handleResovleTask(parser, list);

		parser.close();

		return list;
	}

	// ======================

	public static final String toJSONString(Object object) {
		return toJSONString(object, new SerializerFeature[0]);
	}

	public static final String toJSONString(Object object, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);
			serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
			serializer.getPropertyFilters().add(filter);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}

			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	/**
	 * @since 1.1.14
	 */
	public static final String toJSONStringWithDateFormat(Object object, String dateFormat,
			SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();
		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);
			serializer.getPropertyFilters().add(filter);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}
			serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
			if (dateFormat != null) {
				serializer.setDateFormat(dateFormat);
			}
			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	public static final String toJSONString(Object object, SerializeFilter filter, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}

			serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
			serializer.setDateFormat(DATEFORMATE);
			if (filter != null) {
				if (filter instanceof PropertyPreFilter) {
					serializer.getPropertyPreFilters().add((PropertyPreFilter) filter);
				}

				if (filter instanceof NameFilter) {
					serializer.getNameFilters().add((NameFilter) filter);
				}

				if (filter instanceof ValueFilter) {
					serializer.getValueFilters().add((ValueFilter) filter);
				}

				if (filter instanceof PropertyFilter) {
					serializer.getPropertyFilters().add((PropertyFilter) filter);
				}
			}

			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	/**
	 * 过滤object的属性值 <br/>
	 * 如A:{b:{name:"",no:""},name:""} 序列化A的实例时只序列号a和b的名称 表达式：{name,b{name}}
	 * 
	 * @param object
	 * @param filterStr
	 * @return String
	 */
	public static final String toJSONString(Object object, String filterStr) {
		return toJSONString(object, filterStr, true);
	}

	/**
	 * 过滤object的属性值 <br/>
	 * 如A:{b:{name:"",no:""},name:""} 序列化A的实例时过滤a和b的名称 表达式：{name,b{name}}
	 * 
	 * @param object
	 * @param filterStr
	 * @param flag
	 *            过滤开关
	 * @return String
	 */
	public static final String toJSONString(Object object, String filterStr, boolean flag) {
		SerializeWriter out = new SerializeWriter();
		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);

			if (filter != null) {
				if (filter instanceof PropertyPreFilter) {
					serializer.getPropertyPreFilters().add((PropertyPreFilter) filter);
				}

				if (filter instanceof NameFilter) {
					serializer.getNameFilters().add((NameFilter) filter);
				}

				if (filter instanceof ValueFilter) {
					serializer.getValueFilters().add((ValueFilter) filter);
				}

				if (filter instanceof PropertyFilter) {
					serializer.getPropertyFilters().add((PropertyFilter) filter);
				}
			}
			if (!StringUtils.isEmpty(filterStr)) {
				String[] strs = parseFillterJson(filterStr, flag);
				if (flag == true) {
					strs = processFillterJson(strs);
				}

				serializer.getPropertyPreFilters().add(new BasePropertyPreFilter(strs, flag));
			}
			serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
			serializer.config(SerializerFeature.WriteNullStringAsEmpty, true);
			serializer.config(SerializerFeature.PrettyFormat, true);
			serializer.setDateFormat(DATEFORMATE);
			// serializer.config(SerializerFeature.PrettyFormat, true);
			// for (com.alibaba.fastjson.serializer.SerializerFeature feature :
			// features) {
			// }
			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	public static final String toFilterJSONString(Object object, String filterStr, SerializerFeature... features) {
		return toFilterJSONString(object, filterStr, true, features);
	}

	/**
	 * 过滤object的属性值 <br/>
	 * 如A:{b:{name:"",no:""},name:""} 序列化A的实例时过滤a和b的名称 表达式：{name,b{name}}
	 * 
	 * @param object
	 * @param filterStr
	 * @param flag
	 * @param features
	 * @return String
	 */
	public static final String toFilterJSONString(Object object, String filterStr, boolean flag,
			SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();
		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);

			if (filter != null) {
				if (filter instanceof PropertyPreFilter) {
					serializer.getPropertyPreFilters().add((PropertyPreFilter) filter);
				}

				if (filter instanceof NameFilter) {
					serializer.getNameFilters().add((NameFilter) filter);
				}

				if (filter instanceof ValueFilter) {
					serializer.getValueFilters().add((ValueFilter) filter);
				}

				if (filter instanceof PropertyFilter) {
					serializer.getPropertyFilters().add((PropertyFilter) filter);
				}
			}

			if (!StringUtils.isEmpty(filterStr)) {
				String[] strs = parseFillterJson(filterStr, flag);
				if (flag == true) {
					strs = processFillterJson(strs);
				}

				serializer.getPropertyPreFilters().add(new BasePropertyPreFilter(strs, flag));
			}
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}
			serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
			serializer.config(SerializerFeature.WriteNullStringAsEmpty, true);
			// serializer.config(SerializerFeature.PrettyFormat, true);
			serializer.setDateFormat(DATEFORMATE);
			// serializer.config(SerializerFeature.PrettyFormat, true);
			// for (com.alibaba.fastjson.serializer.SerializerFeature feature :
			// features) {
			// }
			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	public static final byte[] toJSONBytes(Object object, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}

			serializer.write(object);

			return out.toBytes("UTF-8");
		} finally {
			out.close();
		}
	}

	public static final String toJSONString(Object object, SerializeConfig config, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out, config);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}

			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	public static final String toJSONStringZ(Object object, SerializeConfig mapping, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter(features);

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out, mapping);

			serializer.write(object);

			return out.toString();
		} finally {
			out.close();
		}
	}

	public static final byte[] toJSONBytes(Object object, SerializeConfig config, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter();

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out, config);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}

			serializer.write(object);

			return out.toBytes("UTF-8");
		} finally {
			out.close();
		}
	}

	public static final String toJSONString(Object object, boolean prettyFormat) {
		if (!prettyFormat) {
			return toJSONString(object);
		}

		return toJSONString(object, SerializerFeature.PrettyFormat);
	}

	public static final void writeJSONStringTo(Object object, Writer writer, SerializerFeature... features) {
		SerializeWriter out = new SerializeWriter(writer);

		try {
			BaseJSONSerializer serializer = new BaseJSONSerializer(out);
			for (com.alibaba.fastjson.serializer.SerializerFeature feature : features) {
				serializer.config(feature, true);
			}

			serializer.write(object);
		} finally {
			out.close();
		}
	}

	// ======================================

	@Override
	public String toString() {
		return toJSONString();
	}

	@Override
	public String toJSONString() {
		SerializeWriter out = new SerializeWriter();
		try {
			new BaseJSONSerializer(out).write(this);
			return out.toString();
		} finally {
			out.close();
		}
	}

	@Override
	public void writeJSONString(Appendable appendable) {
		SerializeWriter out = new SerializeWriter();
		try {
			new BaseJSONSerializer(out).write(this);
			appendable.append(out.toString());
		} catch (IOException e) {
			throw new JSONException(e.getMessage(), e);
		} finally {
			out.close();
		}
	}

	// ///////

	public static final Object toJSON(Object javaObject) {
		return toJSON(javaObject, ParserConfig.getGlobalInstance());
	}

	@SuppressWarnings("unchecked")
	public static final Object toJSON(Object javaObject, ParserConfig mapping) {
		if (javaObject == null) {
			return null;
		}

		if (javaObject instanceof BaseJSON) {
			return javaObject;
		}

		if (javaObject instanceof Map) {
			Map<Object, Object> map = (Map<Object, Object>) javaObject;

			JSONObject json = new JSONObject(map.size());

			for (Map.Entry<Object, Object> entry : map.entrySet()) {
				Object key = entry.getKey();
				String jsonKey = TypeUtils.castToString(key);
				Object jsonValue = toJSON(entry.getValue());
				json.put(jsonKey, jsonValue);
			}

			return json;
		}

		if (javaObject instanceof Collection) {
			Collection<Object> collection = (Collection<Object>) javaObject;

			JSONArray array = new JSONArray(collection.size());

			for (Object item : collection) {
				Object jsonValue = toJSON(item);
				array.add(jsonValue);
			}

			return array;
		}

		Class<?> clazz = javaObject.getClass();

		if (clazz.isEnum()) {
			return ((Enum<?>) javaObject).name();
		}

		if (clazz.isArray()) {
			int len = Array.getLength(javaObject);

			JSONArray array = new JSONArray(len);

			for (int i = 0; i < len; ++i) {
				Object item = Array.get(javaObject, i);
				Object jsonValue = toJSON(item);
				array.add(jsonValue);
			}

			return array;
		}

		if (mapping.isPrimitive(clazz)) {
			return javaObject;
		}

		try {
			List<FieldInfo> getters = TypeUtils.computeGetters(clazz, null);

			JSONObject json = new JSONObject(getters.size());

			for (FieldInfo field : getters) {
				Object value = field.get(javaObject);
				Object jsonValue = toJSON(value);

				json.put(field.getName(), jsonValue);
			}

			return json;
		} catch (Exception e) {
			throw new JSONException("toJSON error", e);
		}
	}

	public static final <T> T toJavaObject(BaseJSON json, Class<T> clazz) {
		return TypeUtils.cast(json, clazz, ParserConfig.getGlobalInstance());
	}

	public final static String VERSION = "1.1.33";
	public final static String DATEFORMATE = "yyyy-MM-dd HH:mm:ss";

	private static ValueFilter valueFilter = new ValueFilter() {

		@Override
		public Object process(Object source, String name, Object value) {
			if (value == null) {
				return false;
			} else if ("java.lang.Object".equals(value.getClass().getName())) {
				if (StringUtils.isEmpty(value)) {
					return false;
				}
			}
			return null;
		}
	};
	private static PropertyFilter filter = new PropertyFilter() {
		@Override
		public boolean apply(Object source, String name, Object value) {
			boolean result = true;
			try {
				if (Map.class.isInstance(source)) {
					return true;
				} else {
					Field field = null;
					Field[] fields = source.getClass().getDeclaredFields();
					if (!"java.lang.Object".equals(source.getClass().getSuperclass().getName())) {
						fields = ArrayUtils.addAll(fields, source.getClass().getSuperclass().getDeclaredFields());
					}

					if (fields != null && fields.length > 0) {
						for (Field f : fields) {
							if (f.getName().equals(name)) {
								field = f;
								break;
							}
						}
						if (field != null && field.isAnnotationPresent(JSONFilter.class)) {
							result = false;
						}
					} else {
						return false;
					}

				}
			} catch (Exception e) {
				Log.error("error:" + name + ":" + value);
				// Log.error(Exceptions.getStackTraceAsString(e));
			}
			return result;

		}
	};

	public static String[] parseFillterJson(String str, boolean flag) {
		List<String> res = new LinkedList<String>();
		String path = "";
		char[] chs = str.toCharArray();
		StringBuffer temp = new StringBuffer();
		for (int i = 0; i < chs.length; i++) {
			if (chs[i] == '{') {
				if (i == 0) {
					continue;
				}
				if (path.length() > 0) {
					path = path + "." + temp.toString().trim();
					if (flag) {
						res.add(path);
					}
				} else {
					path = temp.toString().trim();
				}
				temp = new StringBuffer();
			} else if (chs[i] == '}') {
				if (temp.toString().trim().length() > 0) {
					if (path.length() > 0) {
						res.add(path + "." + temp.toString().trim());
					} else {
						res.add(temp.toString().trim());
					}
				}
				if (path.lastIndexOf(".") > 0) {
					path = path.substring(0, path.lastIndexOf("."));
				} else {
					path = "";
				}
				temp = new StringBuffer();
			} else if (chs[i] == ',') {
				if (temp.toString().trim().length() > 0) {
					if (path.length() > 0) {
						res.add(path + "." + temp.toString().trim());
					} else {
						res.add(temp.toString().trim());
					}
				}
				temp = new StringBuffer();
			} else {
				temp.append(chs[i]);
			}
		}
		return res.toArray(new String[] {});
	}

	public static String[] processFillterJson(String[] strs) {
		HashSet<String> set = new HashSet<String>();
		for (String str : strs) {
			int pos = str.lastIndexOf(".");
			if (pos > 0) {
				set.add(str.substring(0, pos));
			}
			set.add(str);
		}
		return set.toArray(new String[] {});

	}

}
