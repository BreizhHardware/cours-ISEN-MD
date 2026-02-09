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

