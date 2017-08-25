package com.tky.lxl.platform.sqlsession;

import java.util.List;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.defaults.DefaultSqlSessionFactory;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.tky.lxl.platform.dao.BaseMapper;
import com.tky.lxl.platform.dao.business.InitPointMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.InitPoint;

/**
 * 
 * <p>Title:MySqlSession </p>
 * <p>Description: 数据批量导入</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年4月16日 下午7:30:16）
 *
 * @version:1.0.0 copyright © 2017-2018
 * @param <T>
 */
public class MySqlSession<T> {

	private static Logger logger = Logger.getLogger(MySqlSession.class);
	
	static ApplicationContext ctx  = new ClassPathXmlApplicationContext("applicationContext.xml");
	public MySqlSession() {
		super();
		
	}

	/**
	 * 导入数据库的数据
	 * @param data
	 * @param mClass
	 */
	
	public static void mybatisSqlSession(List<InitPoint> pointlists){		
        DefaultSqlSessionFactory sqlSessionFactory = (DefaultSqlSessionFactory)ctx.getBean("sqlSessionFactory");
        SqlSession batchSqlSession = null;
        
        try{
        	
            batchSqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
            int batchCount = 30;//每批commit的个数
            
            for(int index = 0; index < pointlists.size();index++){

				InitPoint initPoint = pointlists.get(index);
				
				// 如果shortname为空，当前数据不插入DB
				if (initPoint.getShortname() == null) {
					continue;
				}
				
            	//直线段或0号块时，分大小里程
				if(initPoint.getLdtype()==Const.LDType.ZERO || initPoint.getLdtype() ==Const.LDType.BKFDC){
					
					//小里程
					for(Short j=1;j<=6;j++){
						
						if(j!=6){
							
//							log.info("特殊梁段-小里程-测量桩："+initPoint.getPartid());
							InitPoint point = new InitPoint(initPoint.getConbeamid(), initPoint.getPier(), initPoint.getPartid(), initPoint.getLdtype(), initPoint.getProjectid(), initPoint.getSectionid(), initPoint.getSiteid());
							//测点类型
							point.setPointtype(Const.CDType.CD);
							//测点位置号
							point.setPointplace(j);
							//里程区分
							point.setMileageflag(Const.LCType.XIAO_LC);
							//测点名称  02墩1-小-2-桩(T构号 梁段号 大小里程 测点号 测点类型)
							
							point.setPointname(initPoint.getPier()+"#"+initPoint.getShortname().split("\\-")[0]+"-小-"+j+"-桩");
							batchSqlSession.getMapper(InitPointMapper.class).createInitPoint(point);
						}
						
//						log.info("特殊梁段-小里程-临时测点："+initPoint.getPartid());
						InitPoint point = new InitPoint(initPoint.getConbeamid(), initPoint.getPier(), initPoint.getPartid(), initPoint.getLdtype(), initPoint.getProjectid(), initPoint.getSectionid(), initPoint.getSiteid());
						//测点类型
						point.setPointtype(Const.CDType.LSCD);
						//测点位置号
						point.setPointplace(j);
						//里程区分
						point.setMileageflag(Const.LCType.XIAO_LC);
						//测点名称
						point.setPointname(initPoint.getPier()+"#"+initPoint.getShortname().split("\\-")[0]+"-小-"+j+"-临");
						batchSqlSession.getMapper(InitPointMapper.class).createInitPoint(point);
					}
					
					//大里程
					for(Short j=1;j<=6;j++){
						
						if(j!=6){
							
//							log.info("特殊梁段-大里程-测量桩："+initPoint.getPartid());
							InitPoint point = new InitPoint(initPoint.getConbeamid(), initPoint.getPier(), initPoint.getPartid(), initPoint.getLdtype(), initPoint.getProjectid(), initPoint.getSectionid(), initPoint.getSiteid());
							//测点类型
							point.setPointtype(Const.CDType.CD);
							//测点位置号
							point.setPointplace(j);
							//里程区分
							point.setMileageflag(Const.LCType.DA_LC);
							//测点名称  02墩1-小-2-桩(T构号 梁段号 大小里程 测点号 测点类型)
							
							point.setPointname(initPoint.getPier()+"#"+initPoint.getShortname().split("\\-")[0]+"-大-"+j+"-桩");
							batchSqlSession.getMapper(InitPointMapper.class).createInitPoint(point);
						}
						
//						log.info("特殊梁段-大里程-临时测点："+initPoint.getPartid());
						InitPoint point = new InitPoint(initPoint.getConbeamid(), initPoint.getPier(), initPoint.getPartid(), initPoint.getLdtype(), initPoint.getProjectid(), initPoint.getSectionid(), initPoint.getSiteid());
						//测点类型
						point.setPointtype(Const.CDType.LSCD);
						//测点位置号
						point.setPointplace(j);
						//里程区分
						point.setMileageflag(Const.LCType.DA_LC);
						//测点名称
						point.setPointname(initPoint.getPier()+"#"+initPoint.getShortname().split("\\-")[0]+"-大-"+j+"-临");
						batchSqlSession.getMapper(InitPointMapper.class).createInitPoint(point);
					}
				}else{//普通梁段
					
					for(Short j=1;j<=6;j++){
						
						String mileageName = getMileageName(initPoint.getMileageflag());
						if(j!=6){
							
//							log.info("普通梁段-测量桩："+initPoint.getPartid());
							InitPoint point = new InitPoint(initPoint.getConbeamid(), initPoint.getPier(), initPoint.getPartid(), initPoint.getLdtype(), initPoint.getProjectid(), initPoint.getSectionid(), initPoint.getSiteid());
							//测点类型
							point.setPointtype(Const.CDType.CD);
							//测点位置号
							point.setPointplace(j);
							//测点名称  02墩1-小-2(T构号 梁段号 大小里程 测点号)
							point.setPointname(initPoint.getPier()+"#"+initPoint.getShortname().split("\\-")[0]+"-"+mileageName+"-"+j+"-桩");
							//大小里程区分
							point.setMileageflag(initPoint.getMileageflag());
							batchSqlSession.getMapper(InitPointMapper.class).createInitPoint(point);
						}
						
//						log.info("普通梁段-临时测点："+initPoint.getPartid());
						InitPoint point = new InitPoint(initPoint.getConbeamid(), initPoint.getPier(), initPoint.getPartid(), initPoint.getLdtype(), initPoint.getProjectid(), initPoint.getSectionid(), initPoint.getSiteid());
						//测点类型
						point.setPointtype(Const.CDType.LSCD);
						//测点位置号
						point.setPointplace(j);
						//测点名称
						point.setPointname(initPoint.getPier()+"#"+initPoint.getShortname().split("\\-")[0]+"-"+mileageName+"-"+j+"-临");
						//大小里程区分
						point.setMileageflag(initPoint.getMileageflag());
						batchSqlSession.getMapper(InitPointMapper.class).createInitPoint(point);
					}
				}
			
                if(index !=0 && index%batchCount == 0){
                	logger.info("commit="+index);
                    batchSqlSession.commit();
                }
            }
            batchSqlSession.commit();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(batchSqlSession != null){
                batchSqlSession.close();
            }
        }
  }
	
	
	/**
	 * 根据大小里程的key值获取name
	 * @param key
	 * @return
	 */
	private static String getMileageName(Short key){
		String mileageName="";
		switch (key) {
		case 0:
			mileageName ="小";
			break;
		case 1:
		mileageName ="大";
		break;
		default:
			break;
		}
		return mileageName;
	}
	
	/**
	 * 导入数据库的数据
	 * 
	 * @param data
	 * @param mClass
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void saveSyncData(List<T> data, Class mClass) {
		
		DefaultSqlSessionFactory sqlSessionFactory = (DefaultSqlSessionFactory) ctx.getBean("sqlSessionFactory");
		SqlSession batchSqlSession = null;
		
		try {
			
			batchSqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
			
			// 每批提交的个数
			int batchCount = 500;
			for (int index = 0; index < data.size(); index++) {
				
				// 同步
				T t = data.get(index);
				((BaseMapper) batchSqlSession.getMapper(mClass)).saveOrUpdate(t);
				
				// 每500条数据提交
				if (index != 0 && index % batchCount == 0) {
					batchSqlSession.commit();
				}
			}
			
			// 提交剩余不足500条的数据
			batchSqlSession.commit();
		} catch (Exception e) {
			
			logger.error(e.getMessage());
			e.printStackTrace();
		} finally {
			
			if (batchSqlSession != null) {
				batchSqlSession.close();
			}
		}
	}
}
