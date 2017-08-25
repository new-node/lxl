package com.tky.lxl.platform.utils;

import java.util.Collection;

public class CollectionUtils {
	public CollectionUtils() {
    }

    public static boolean isNotEmpty(Collection coll) {
        return org.apache.commons.collections.CollectionUtils.isNotEmpty(coll);
    }

    public static boolean isEmpty(Collection coll) {
        return org.apache.commons.collections.CollectionUtils.isEmpty(coll);
    }
}
