#CIPA4 #DP #SécuritéIOT

# Partie I
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

```bash
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ grep '^default' etc/passwd > default.passwd
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ grep '^default' etc/shadow > default.shadow
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ unshadow default.passwd default.shadow > default.hash
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ john default.hash --wordlist=/usr/share/john/password.lst
Loaded 1 password hash (md5crypt [MD5 32/64 X2])
No password hashes left to crack (see FAQ)
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ john --show default.hash
default:default:1001:1001:Linux User,,,:/home/default:/bin/sh

1 password hash cracked, 0 left



felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ john root.hash    
Loaded 1 password hash (md5crypt [MD5 32/64 X2])
Will run 4 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
device           (root)
1g 0:00:00:42 3/3 0.02334g/s 52777p/s 52777c/s 52777C/s delomy..deva09
Use the "--show" option to display all of the cracked passwords reliably
Session completed
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ john --show root.hash
root:device:0:0:root:/root:/bin/sh

1 password hash cracked, 0 left
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


```bash
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ sudo chroot . ./qemu-mips bin/busybox
BusyBox v1.27.2 (2018-04-23 15:08:10 EDT) multi-call binary.
BusyBox is copyrighted by many authors between 1998-2015.
Licensed under GPLv2. See source distribution for detailed
copyright notices.

Usage: busybox [function [arguments]...]
   or: busybox --list[-full]
   or: busybox --install [-s] [DIR]
   or: function [arguments]...

        BusyBox is a multi-call binary that combines many common Unix
        utilities into a single executable.  Most people will create a
        link to busybox for each function they wish to use and BusyBox
        will act like whatever it was invoked as.

Currently defined functions:
        [, [[, addgroup, adduser, ar, arp, arping, ash, awk, basename, blkid, bunzip2, bzcat, cat, chattr, chgrp, chmod, chown, chroot, chrt, chvt, cksum, clear, cmp, cp, cpio, crond, crontab, cut,
        date, dc, dd, deallocvt, delgroup, deluser, devmem, df, diff, dirname, dmesg, dnsd, dnsdomainname, dos2unix, du, dumpkmap, echo, egrep, eject, env, ether-wake, expr, factor, fallocate,
        false, fbset, fdflush, fdformat, fdisk, fgrep, find, flock, fold, free, freeramdisk, fsck, fsfreeze, fstrim, fuser, getopt, getty, grep, gunzip, gzip, halt, hdparm, head, hexdump, hostid,
        hostname, hwclock, i2cdetect, i2cdump, i2cget, i2cset, id, ifconfig, ifdown, ifup, inetd, init, insmod, install, ip, ipaddr, ipcrm, ipcs, iplink, ipneigh, iproute, iprule, iptunnel, kill,
        killall, killall5, klogd, last, less, link, linux32, linux64, linuxrc, ln, loadfont, loadkmap, logger, login, logname, losetup, ls, lsattr, lsmod, lsof, lspci, lsscsi, lsusb, lzcat, lzma,
        lzopcat, makedevs, md5sum, mdev, mesg, microcom, mkdir, mkdosfs, mke2fs, mkfifo, mknod, mkpasswd, mkswap, mktemp, modprobe, more, mount, mountpoint, mt, mv, nameif, netstat, nice, nl, nohup,
        nproc, nslookup, od, openvt, partprobe, passwd, paste, patch, pidof, ping, pipe_progress, pivot_root, poweroff, printenv, printf, ps, pwd, rdate, readlink, readprofile, realpath, reboot,
        renice, reset, resize, rm, rmdir, rmmod, route, run-parts, runlevel, sed, seq, setarch, setconsole, setkeycodes, setlogcons, setpriv, setserial, setsid, sh, sha1sum, sha256sum, sha3sum,
        sha512sum, shred, sleep, sort, start-stop-daemon, strings, stty, su, sulogin, svc, swapoff, swapon, switch_root, sync, sysctl, syslogd, tail, tar, tee, telnet, test, tftp, time, top, touch,
        tr, traceroute, true, truncate, tty, ubirename, udhcpc, uevent, umount, uname, uniq, unix2dos, unlink, unlzma, unlzop, unxz, unzip, uptime, usleep, uudecode, uuencode, vconfig, vi, vlock, w,
        watch, watchdog, wc, wget, which, who, whoami, xargs, xxd, xz, xzcat, yes, zcat
```

```bash
felix@Debian-13:~/Firmware/_iotdev_firmware.bin.extracted/squashfs-root$ sudo chroot . ./qemu-mips bin/busybox sh
/ # exit
```

# Partie II
```bash
felix@Debian-13:~/Firmware$ tar -xvf emulated.tgz 
emulated/
emulated/mips32/
emulated/mips32/start_device.sh
emulated/mips32/vmlinux
emulated/mips32/rootfs.ext2
```


