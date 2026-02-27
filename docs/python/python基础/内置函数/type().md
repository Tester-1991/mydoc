---
id: 12
title: type()
sidebar_position: 12
---
Python内置函数 `type()` 具有两种截然不同的功能，具体取决于传入参数的数量：获取对象类型或动态创建类。

### 1. 函数定义与功能

**语法 1：`type(object)`**
*   **功能**：返回传入对象的类型（即该对象所属的类）。
*   **返回值**：一个 `type` 对象。

**语法 2：`type(name, bases, dict, **kwds)`**
*   **功能**：动态创建一个新的类。这是Python元编程（Metaprogramming）的基础。
*   **参数**：
    *   `name` (str)：类名。
    *   `bases` (tuple)：包含基类的元组（用于继承）。
    *   `dict` (dict)：包含类属性和方法的字典。

---

### 2. 项目使用场景与代码示例

#### 场景一：调试与日志记录
在处理复杂数据流、解析非结构化数据或调用第三方API时，数据类型可能不可预知。使用 `type()` 可以记录异常数据的真实类型，便于后续排查。

**示例：**
```python
def process_api_response(data):
    # 假设预期 data 是字典，但实际可能收到字符串或列表
    if not isinstance(data, dict):
        import logging
        logging.error(f"Invalid data format received. Expected dict, got {type(data)}")
        return None
    return data.get("status")

# 测试
process_api_response(["item1", "item2"]) 
# 日志输出: ERROR:root:Invalid data format received. Expected dict, got <class 'list'>
```

#### 场景二：严格类型检查（排除子类）
在面向对象编程中，通常推荐使用 `isinstance()` 进行类型检查，因为它支持继承多态。但在某些极严格的场景下，如果**明确要求对象必须是某个特定类，而不能是其子类**，则必须使用 `type()`。

**示例：**
```python
class BaseConfig:
    pass

class AdvancedConfig(BaseConfig):
    pass

def load_base_config(config_obj):
    # 严格限制只能是 BaseConfig，不能是 AdvancedConfig
    if type(config_obj) is not BaseConfig:
        raise TypeError("Only BaseConfig is allowed, subclasses are rejected.")
    print("Config loaded.")

# 测试
base = BaseConfig()
adv = AdvancedConfig()

load_base_config(base)  # 正常运行
# load_base_config(adv) # 将抛出 TypeError
```

#### 场景三：动态创建类（工厂模式/框架开发）
在开发ORM（对象关系映射）框架、RPC客户端或需要根据配置文件在运行时生成类的场景中，使用三个参数的 `type()` 可以避免编写大量重复的硬编码类。

**示例：**
```python
def create_model_class(table_name, fields):
    """根据表名和字段动态生成数据库模型类"""
    # 动态构建类的属性字典
    class_attributes = {field: None for field in fields}
    class_attributes['__tablename__'] = table_name
    
    # 使用 type() 动态创建类
    # 参数: 类名(首字母大写), 基类(继承自object), 属性字典
    ModelClass = type(table_name.capitalize(), (object,), class_attributes)
    return ModelClass

# 运行时根据配置生成 User 类
User = create_model_class("user", ["id", "username", "email"])

# 实例化并使用动态生成的类
user_instance = User()
user_instance.id = 1
user_instance.username = "admin"

print(type(user_instance))       # 输出: <class '__main__.User'>
print(user_instance.__tablename__) # 输出: user
```

### 总结
*   **单参数 `type()`** 主要用于调试、日志记录以及需要阻断多态的严格类型比对。
*   **三参数 `type()`** 主要用于底层框架开发和元编程，以实现高度动态化的代码结构。