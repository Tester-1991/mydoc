---
id: 9
title: bytes()
sidebar_position: 9
---
`bytes()` 是 Python 的内置函数，用于创建一个**不可变**的字节序列（bytes object）。

在 Python 3 中，**字符串（str）**和**字节（bytes）**是完全不同的两种数据类型：
*   **`str`**: 存储 Unicode 字符，给人看的（如 "你好"）。
*   **`bytes`**: 存储原始二进制数据（0-255 的整数序列），给机器看的（如 `b'\xe4\xbd\xa0\xe5\xa5\xbd'`）。

### 1. 基础介绍

#### 语法
```python
class bytes([source[, encoding[, errors]]])
```

#### 常见创建方式
1.  **字符串转字节**（必须指定编码）：
    ```python
    b1 = bytes("你好", encoding="utf-8")
    # 或者更常用的写法：
    b1 = "你好".encode("utf-8")
    print(b1)  # b'\xe4\xbd\xa0\xe5\xa5\xbd'
    ```
2.  **字面量写法**（前缀 `b`）：
    ```python
    b2 = b"Hello"  # 仅限 ASCII 字符
    print(b2[0])   # 72 (对应 'H' 的 ASCII 码)
    ```
3.  **指定大小的空字节序列**（常用于预分配缓冲区）：
    ```python
    b3 = bytes(5)
    print(b3)  # b'\x00\x00\x00\x00\x00' (5个零字节)
    ```
4.  **通过整数列表创建**：
    ```python
    b4 = bytes([65, 66, 67])
    print(b4)  # b'ABC'
    ```

---

### 2. 项目中的实际使用场景

只要涉及**网络传输**、**文件存储**或**底层交互**，几乎都离不开 `bytes`。

#### 场景一：网络编程 (Socket/HTTP)
计算机网络传输的本质是二进制流。无论是 TCP Socket 还是 HTTP 请求，发送的数据必须是 `bytes`，不能是 `str`。

```python
import socket

# 创建 socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("www.example.com", 80))

# 发送 HTTP 请求 (必须是 bytes)
# b"..." 写法直接创建 bytes
request = b"GET / HTTP/1.1\r\nHost: www.example.com\r\n\r\n"
s.send(request)

# 接收响应 (接收到的也是 bytes)
response = s.recv(4096)
print(response) # 输出 b'HTTP/1.1 200 OK...'

# 如果要看懂内容，需要解码
print(response.decode("utf-8"))
```

#### 场景二：二进制文件处理 (图片/音频/视频)
处理非文本文件时，必须以二进制模式（`rb` 或 `wb`）打开，读写的内容就是 `bytes`。

**应用实例**：读取图片的文件头（Magic Number）来判断文件类型。

```python
def get_image_type(file_path):
    with open(file_path, 'rb') as f:
        # 读取前 8 个字节
        header = f.read(8)
    
    # 转换为十六进制字符串进行对比
    hex_header = header.hex().upper()
    
    if hex_header.startswith("FFD8FF"):
        return "JPEG"
    elif hex_header.startswith("89504E47"):
        return "PNG"
    elif hex_header.startswith("47494638"):
        return "GIF"
    return "Unknown"

print(get_image_type("avatar.png"))
```

#### 场景三：加密与哈希 (Cryptography)
所有的加密算法（AES, RSA）和哈希算法（MD5, SHA256）处理的输入数据都必须是 `bytes`。如果你传字符串进去，程序会报错。

```python
import hashlib

password = "my_secret_password"

# 错误写法：hashlib.md5(password) -> TypeError: object supporting the buffer API required

# 正确写法：先 encode 转为 bytes
md5_obj = hashlib.md5(password.encode('utf-8'))

print(md5_obj.hexdigest())
```

#### 场景四：串口通信与硬件交互 (IoT)
在物联网或嵌入式开发中，通过串口（Serial Port）与单片机通信时，发送的指令通常是特定的十六进制字节流。

```python
import serial

# 打开串口
ser = serial.Serial('/dev/ttyUSB0', 9600)

# 发送控制指令：例如开启继电器 [0xA0, 0x01, 0x01, 0xA2]
# bytes([list]) 是构建这种指令最方便的方式
command = bytes([0xA0, 0x01, 0x01, 0xA2])
ser.write(command)

# 读取传感器返回的数据
data = ser.read(10) # 读取10个字节
```

#### 场景五：数据序列化 (Struct)
当需要与 C 语言编写的程序进行二进制数据交换时，Python 的 `struct` 模块可以将 Python 数据打包成 C 结构体的 `bytes` 格式。

```python
import struct

# 模拟 C 结构体: struct { int id; float weight; }
# 'i f' 表示一个整数和一个浮点数
packed_data = struct.pack('if', 1024, 75.5)

print(packed_data) 
# 输出类似: b'\x00\x04\x00\x00\x00\x00\x97B' (这是机器码)
```

### 3. 总结：`str` vs `bytes`

| 特性 | `str` (字符串) | `bytes` (字节串) |
| :--- | :--- | :--- |
| **内容** | Unicode 字符 (文本) | 0-255 的整数序列 (二进制) |
| **用途** | 显示、打印、逻辑处理 | 存储、传输、加密 |
| **转换** | `b.decode('utf-8')` | `s.encode('utf-8')` |
| **可变性** | 不可变 | 不可变 (可变版本是 `bytearray`) |

**一句话记住**：**内存里处理逻辑用 `str`，存硬盘或发网络用 `bytes`。**