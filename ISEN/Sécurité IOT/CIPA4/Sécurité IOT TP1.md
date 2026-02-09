#CIPA4 #DP #SécuritéIOT

```Bash
binwalk ./iotdev_firmware.bin 
                                                                           **/Volumes/SSD/OwnCloud/Personal/Documents/ISEN/Cours/Obsidian Vault/ISEN/Sécurité IOT/CIPA4/Firmware/iotdev_firmware.bin**

**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**DECIMAL                            HEXADECIMAL                        DESCRIPTION**

**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

1180160                            0x120200                           SquashFS file system, little endian, version: 4.0, compression: gzip, inode count: 490, block size: 131072, image size: 6995929 bytes, created: 2018-05-01 13:54:27

**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

  

Analyzed 1 file for 85 file signatures (187 magic patterns) in 227.0 milliseconds
```
Sert à analyser le binaire 

```Bash
binwalk -e ./iotdev_firmware.bin 
```

Sert à extraire des fichiers du binaire


```bash
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ cat etc/shadow
root:$1$TO1dd7Y2$G7nYNf7F8re7.gl355jXM1:10933:0:99999:7:::
daemon:*:10933:0:99999:7:::
bin:*:10933:0:99999:7:::
sys:*:10933:0:99999:7:::
sync:*:10933:0:99999:7:::
mail:*:10933:0:99999:7:::
www-data:*:10933:0:99999:7:::
operator:*:10933:0:99999:7:::
nobody:*:10933:0:99999:7:::
sshd:*:::::::
default:$1$TLEiB.OR$ZU8PwoIb2Z0jh8Eyex7m.1:17645:0:99999:7:::
```


Il y a un serveur Web et un serveur SSH.

```bash
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ readelf -h bin/busybox
ELF Header:
  Magic:   7f 45 4c 46 01 02 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF32
  Data:                              2's complement, big endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           MIPS R3000
  Version:                           0x1
  Entry point address:               0x403010
  Start of program headers:          52 (bytes into file)
  Start of section headers:          874404 (bytes into file)
  Flags:                             0x70001007, noreorder, pic, cpic, o32, mips32r2
  Size of this header:               52 (bytes)
  Size of program headers:           32 (bytes)
  Number of program headers:         9
  Size of section headers:           40 (bytes)
  Number of section headers:         27
  Section header string table index: 26
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ bin/busybox 
mips-binfmt-P: Could not open '/lib/ld-uClibc.so.0': No such file or directory
```


